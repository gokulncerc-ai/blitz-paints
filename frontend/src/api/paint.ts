// Path: frontend/src/api/paint.ts
// Uploads a room photo (from file picker or camera capture) to the backend,
// which proxies it to the ML service and returns a wall mask PNG. This
// bypasses apiFetch() deliberately - that helper expects a JSON
// { success, data } envelope, but this endpoint streams back raw image
// bytes, so it needs its own fetch call and its own error handling.
import { json } from 'react-router-dom';
import { API_BASE_URL } from './client';
export class SegmentWallError extends Error { }
// POST /api/paint/segment-wall - matches backend's `segmentWall` controller
export async function segmentWall(file: File | Blob): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file, file instanceof File ? file.name : 'capture.jpg');

    const res = await fetch(`${API_BASE_URL}/paint/segment-wall`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        let message = `Could not detect the wall in that photo (status ${res.status})`;
        try {
            const json = await res.json();
            if (json?.message) message = json.message;
        } catch {
            // response wasn't JSON (e.g. a raw 500 page) - keep the default message
        }
        throw new SegmentWallError(message);
    }

    return res.blob();
}