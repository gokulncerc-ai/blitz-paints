import { Router } from 'express';
import { listColours } from '../controllers/colours.controller';
const router = Router();
router.get('/', listColours); // GET /api/colours
export default router;
