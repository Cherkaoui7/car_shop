// apps/api/src/routes/inventory.routes.ts
import { Router } from 'express';
import { getCatalog, reserveVehicle, ingestVehicle } from '../controllers/inventory.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();
router.get('/', getCatalog);
router.post('/reserve', reserveVehicle);
router.post('/ingest', requireAuth, requireRole('ADMIN'), upload.single('photo'), ingestVehicle);
export default router;
