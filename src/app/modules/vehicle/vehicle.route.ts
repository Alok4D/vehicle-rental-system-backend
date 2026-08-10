import { Router } from 'express';
import { VehicleControllers } from './vehicle.controller';
import auth from '../../middlwares/auth';

const router = Router();

router.post('/', auth('admin'), VehicleControllers.createVehicle);
router.get('/', VehicleControllers.getAllVehicles);
router.get('/:vehicleId', VehicleControllers.getVehicleById);
router.put('/:vehicleId', auth('admin'), VehicleControllers.updateVehicle);
router.delete('/:vehicleId', auth('admin'), VehicleControllers.deleteVehicle);

export const VehicleRoutes = router;
