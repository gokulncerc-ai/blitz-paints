// Path: backend/src/routes/products.routes.ts
import { Router } from 'express';
import { listProducts, getProductBySlug } from '../controllers/products.controller';

const router = Router();

router.get('/', listProducts);          // GET /api/products
router.get('/:slug', getProductBySlug); // GET /api/products/:slug

export default router;
