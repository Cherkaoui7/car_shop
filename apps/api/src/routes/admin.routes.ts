// apps/api/src/routes/admin.routes.ts
import { Router } from 'express';
import { uploadMiddleware, ingestVehicle } from '../controllers/admin.controller';

const router = Router();
router.post('/ingest', uploadMiddleware, ingestVehicle);
export default router;
