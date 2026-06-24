// apps/api/src/routes/inventory.routes.ts
import { Router } from 'express';
import { getCatalog, reserveVehicle } from '../controllers/inventory.controller';

const router = Router();
router.get('/', getCatalog);
router.post('/reserve', reserveVehicle);
export default router;
