import { Router } from 'express';
import productsRoutes from './products.routes';
import servicesRoutes from './services.routes';
import enquiriesRoutes from './enquiries.routes';
import galleryRoutes from './gallery.routes';
import newsRoutes from './news.routes';
import coloursRoutes from './colours.routes';
import paintRoutes from './paint.routes';

const router = Router();
router.get('/health', (_req, res) => res.json({ status: 'ok', message: 'Blitz Paints API running' }));

router.use('/products', productsRoutes);
router.use('/services', servicesRoutes);
router.use('/enquiries', enquiriesRoutes);
router.use('/news', newsRoutes);
router.use('/colours', coloursRoutes);
router.use('/paint', paintRoutes);
router.use('/', galleryRoutes);

export default router;