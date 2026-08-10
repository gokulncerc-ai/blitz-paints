// Path: backend/src/routes/enquiries.routes.ts
import { Router } from 'express';
import { createEnquiry, listEnquiries, updateEnquiryStatus } from '../controllers/enquiries.controller';
import { attachUser } from '../middleware/authenticate.middleware';

const router = Router();

router.post('/', createEnquiry); // POST /api/enquiries (public, no auth needed)

// attachUser is non-blocking in Phase 1 (no JWT_SECRET set = req.user stays undefined).
// Swap to requireAuth + requireRole('admin') here once Phase 2 admin login exists.
router.get('/', attachUser, listEnquiries);                   // GET   /api/enquiries
router.patch('/:id/status', attachUser, updateEnquiryStatus); // PATCH /api/enquiries/:id/status

export default router;