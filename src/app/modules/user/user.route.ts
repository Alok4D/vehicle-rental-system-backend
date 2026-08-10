import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlwares/auth';

const router = Router();

router.get('/', auth('admin'), UserControllers.getAllUsers);
router.put('/:userId', auth('admin', 'customer'), UserControllers.updateUser);
router.delete('/:userId', auth('admin'), UserControllers.deleteUser);

export const UserRoutes = router;
