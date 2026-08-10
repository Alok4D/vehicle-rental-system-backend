import { Router } from 'express';

const router = Router();

import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { VehicleRoutes } from '../modules/vehicle/vehicle.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const moduleRoutes: any[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/vehicles',
    route: VehicleRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
