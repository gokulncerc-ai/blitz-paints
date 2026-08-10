// Path: backend/src/routes/news.routes.ts
import { Router } from 'express';
import { listNews, getNewsBySlug } from '../controllers/news.controller';

const router = Router();

router.get('/', listNews);
router.get('/:slug', getNewsBySlug);

export default router;
