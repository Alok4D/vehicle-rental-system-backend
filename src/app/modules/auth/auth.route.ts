import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post('/signup', AuthControllers.signup);
router.post('/signin', AuthControllers.signin);

export const AuthRoutes = router;
