import { Router } from 'express';
import multer from 'multer';
import { segmentWall } from '../controllers/paint.controller';

const router = Router();

// memoryStorage = the file only ever exists as a Buffer in RAM for the
// duration of this request - nothing is written to disk, matching the
// "temporary preview only" requirement.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/segment-wall', upload.single('file'), segmentWall); // POST /api/paint/segment-wall

export default router;