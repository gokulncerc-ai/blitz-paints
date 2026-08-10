// Path: backend/src/routes/services.routes.ts
import { Router } from 'express';
import { listServices, getServiceBySlug } from '../controllers/services.controller';

const router = Router();

router.get('/', listServices);
router.get('/:slug', getServiceBySlug);

export default router;
