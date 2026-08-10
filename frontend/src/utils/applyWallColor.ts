// Path: frontend/src/utils/applyWallColor.ts
// Paints a colour onto only the "wall" pixels of a room photo, using a
// precomputed black/white mask (white = wall) produced by the Python
// wall-segmentation service (see ml-service/README.md).
//
// Instead of a flat RGB replacement (which looks like a sticker), this
// blends in HSL space: each wall pixel keeps its original Lightness (so
// shadows, highlights, and texture survive) while its Hue/Saturation get
// swapped for the picked colour's. This is the same trick real paint
// visualizer apps use, and it runs entirely client-side, so re-painting on
// every colour click is instant - no network round trip.

function hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            default:
                h = (r - g) / d + 4;
        }
        h /= 6;
    }

    return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    if (s === 0) {
        const v = Math.round(l * 255);
        return [v, v, v];
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        let tt = t;
        if (tt < 0) tt += 1;
        if (tt > 1) tt -= 1;
        if (tt < 1 / 6) return p + (q - p) * 6 * tt;
        if (tt < 1 / 2) return q;
        if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return [
        Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        Math.round(hue2rgb(p, q, h) * 255),
        Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    ];
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export interface ApplyWallColorOptions {
    imageSrc: string;
    maskSrc: string;
    hexColor: string;
    /** 0-1, how much of the wall's own shading/texture to keep. Default 1 (keep all of it). */
    shadingStrength?: number;
}

/**
 * Renders `imageSrc` with `hexColor` painted onto every pixel where
 * `maskSrc` is white, and returns a data URL of the result.
 */
export async function applyWallColor({
    imageSrc,
    maskSrc,
    hexColor,
    shadingStrength = 1,
}: ApplyWallColorOptions): Promise<string> {
    const [image, mask] = await Promise.all([loadImage(imageSrc), loadImage(maskSrc)]);

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not available');

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Draw the mask into an offscreen canvas at the SAME resolution as the
    // photo, so we can read it pixel-for-pixel even if the mask PNG (which
    // comes out of the model at its own resolution) is a different size.
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) throw new Error('Canvas 2D context not available for mask');
    maskCtx.drawImage(mask, 0, 0, maskCanvas.width, maskCanvas.height);
    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height).data;

    const { h: targetH, s: targetS } = hexToHsl(hexColor);

    for (let i = 0; i < pixels.length; i += 4) {
        const maskValue = maskData[i]; // mask is greyscale - the R channel alone is enough
        if (maskValue < 128) continue; // not a wall pixel - leave it exactly as-is

        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Original pixel's lightness - this is what keeps shadows/highlights/texture
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const originalL = (max + min) / 2;

        const [nr, ng, nb] = hslToRgb(targetH, targetS, originalL);

        pixels[i] = r + (nr - r) * shadingStrength;
        pixels[i + 1] = g + (ng - g) * shadingStrength;
        pixels[i + 2] = b + (nb - b) * shadingStrength;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}