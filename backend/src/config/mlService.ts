// Path: backend/src/config/mlService.ts
// Spawns the Python wall-segmentation service (ml-service/generation) as a
// child process when the Node backend starts, so you only need to run
// `pnpm run dev` here - no separate terminal for the ML service.
//
// If the venv/dependencies aren't set up yet, this logs a specific,
// actionable warning and lets the rest of the API start normally; only the
// paint/wall-colour feature will be unavailable until the ML service is
// running.

import { ChildProcess, execFileSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ML_SERVICE_DIR = path.join(__dirname, '..', '..', '..', 'ml-service', 'generation');
const ML_SERVICE_PORT = process.env.ML_SERVICE_PORT || '8000';
const ML_SERVICE_URL = process.env.ML_SERVICE_URL as string;
if (!ML_SERVICE_URL) {
    throw new Error(
        'ML_SERVICE_URL is not set. Add it to backend/.env - e.g. ' +
        'http://localhost:8000 for local dev, or your deployed ML service URL in production.'
    );
}
let mlProcess: ChildProcess | null = null;

function resolvePythonCmd(): string {
    const isWindows = process.platform === 'win32';
    const venvPython = path.join(
        ML_SERVICE_DIR,
        'venv',
        isWindows ? 'Scripts' : 'bin',
        isWindows ? 'python.exe' : 'python'
    );
    return fs.existsSync(venvPython) ? venvPython : 'python';
}

async function checkHealth(): Promise<boolean> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    try {
        const res = await fetch(`${ML_SERVICE_URL}/health`, { signal: controller.signal });
        return res.status === 200;
    } catch {
        return false;
    } finally {
        clearTimeout(timeout);
    }
}

async function waitForHealth(maxAttempts = 60, intervalMs = 1500): Promise<boolean> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (await checkHealth()) return true;
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    return false;
}

// Runs a fast, synchronous "can I even import these?" check before trying to
// launch the server - this turns "No module named uvicorn" (previously only
// visible buried in stdout after a failed spawn) into one clear message.
function checkDependencies(pythonCmd: string): { ok: boolean; error?: string } {
    try {
        execFileSync(
            pythonCmd,
            ['-c', 'import fastapi, uvicorn, torch, transformers, PIL, numpy'],
            { cwd: ML_SERVICE_DIR, stdio: 'pipe', timeout: 15_000 }
        );
        return { ok: true };
    } catch (err: any) {
        const stderr = err.stderr ? err.stderr.toString().trim() : err.message;
        return { ok: false, error: stderr };
    }
}

export async function startMlService(): Promise<void> {
    // In production the ML service is its own deployed service (separate
    // host/container), not something this process should spawn. Just confirm
    // it's reachable at ML_SERVICE_URL and log clearly either way - never
    // block the API from starting because of it.
    if (process.env.NODE_ENV === 'production') {
        const healthy = await checkHealth();
        if (healthy) {
            console.log(`ML service reachable at ${ML_SERVICE_URL}`);
        } else {
            console.warn(
                `ML service NOT reachable at ${ML_SERVICE_URL}. ` +
                'Wall-colour uploads will fail until it is deployed and ML_SERVICE_URL is set correctly.'
            );
        }
        return;
    }

    // Already running (e.g. started manually in another terminal) - use that one.
    if (await checkHealth()) {
        console.log(`ML service already running at ${ML_SERVICE_URL}`);
        return;
    }

    const pythonCmd = resolvePythonCmd();
    const usingVenv = pythonCmd !== 'python';

    console.log(`ML service: using ${usingVenv ? 'venv' : 'system'} Python at ${pythonCmd}`);

    if (!usingVenv) {
        console.warn(
            `ML service: no venv found at ${path.join(ML_SERVICE_DIR, 'venv')}. ` +
            'Wall-colour uploads will be unavailable until it exists. See ml-service/generation setup steps.'
        );
        return;
    }

    const depCheck = checkDependencies(pythonCmd);
    if (!depCheck.ok) {
        console.warn(
            'ML service: dependencies are missing from the venv, so it will not be started.\n' +
            `  Python reported: ${depCheck.error}\n` +
            `  Fix: cd ${ML_SERVICE_DIR} && venv\\Scripts\\activate && pip install -r requirements.txt\n` +
            '  Then confirm with: python -c "import uvicorn, fastapi, torch, transformers"\n' +
            'The rest of the API will keep working - only wall-colour uploads are affected.'
        );
        return;
    }

    console.log(`Starting ML service from ${ML_SERVICE_DIR} on port ${ML_SERVICE_PORT}...`);

    try {
        mlProcess = spawn(
            pythonCmd,
            ['-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', ML_SERVICE_PORT],
            { cwd: ML_SERVICE_DIR }
        );

        mlProcess.stdout?.on('data', (data: Buffer) => console.log(`[ML service] ${data.toString().trim()}`));
        mlProcess.stderr?.on('data', (data: Buffer) => console.log(`[ML service] ${data.toString().trim()}`));
        mlProcess.on('error', (err) => console.error('Failed to spawn ML service:', err.message));
        mlProcess.on('exit', (code) => {
            if (code !== null && code !== 0) {
                console.warn(`ML service exited with code ${code}`);
            }
            mlProcess = null;
        });
    } catch (err) {
        console.warn('Could not start ML service automatically:', err);
        return;
    }

    const ready = await waitForHealth();
    if (ready) {
        console.log(`ML service ready at ${ML_SERVICE_URL}`);
    } else {
        console.warn(
            'ML service did not become ready in time (waited 90s). Wall-colour uploads will be unavailable until it is. ' +
            'Check the [ML service] log lines above for the actual error.'
        );
    }
}

export function stopMlService(): void {
    if (mlProcess) {
        mlProcess.kill();
        mlProcess = null;
    }
}
