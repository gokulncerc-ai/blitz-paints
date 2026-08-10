// Proxies an uploaded room photo to the ML service and streams back the
// wall mask it returns. The image never touches disk on the Node side -
// multer keeps it in memory (see paint.routes.ts) and axios forwards that
// buffer straight through, so this is purely a pass-through for temporary,
// in-request use.
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import FormData from 'form-data';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// POST /api/paint/segment-wall
export async function segmentWall(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file uploaded (field name: "file")' });
        }

        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: req.file.originalname || 'upload.jpg',
            contentType: req.file.mimetype,
        });

        const mlResponse = await axios.post(`${ML_SERVICE_URL}/segment-wall`, formData, {
            headers: formData.getHeaders(),
            responseType: 'arraybuffer',
            timeout: 30_000, // first request after a cold start can take a few seconds
        });

        res.set('Content-Type', 'image/png');
        res.send(Buffer.from(mlResponse.data));
    } catch (err: any) {
        if (err.code === 'ECONNREFUSED') {
            return res.status(503).json({
                success: false,
                message: 'The wall-detection service is not running. Start it and try again.',
            });
        }
        next(err);
    }
}