// apps/api/src/routes/inventory.routes.ts
import { Router } from 'express';
import { getCatalog, reserveVehicle, getVehicleById, getVehicleByVin, probeOrderStatus } from '../controllers/inventory.controller';

const router = Router();
router.get('/', getCatalog);
router.get('/vin/:vin', getVehicleByVin);
router.get('/probe/:intentToken', probeOrderStatus);
router.get('/:id', getVehicleById);
router.post('/reserve', reserveVehicle);
export default router;
