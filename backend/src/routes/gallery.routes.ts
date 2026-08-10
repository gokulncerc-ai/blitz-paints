// Path: backend/src/routes/gallery.routes.ts
import { Router } from 'express';
import { listGallery, listProjects } from '../controllers/gallery.controller';

const router = Router();

router.get('/gallery', listGallery);   // GET /api/gallery
router.get('/projects', listProjects); // GET /api/projects

export default router;
