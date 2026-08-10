import { Router } from 'express';

const router = Router();

const moduleRoutes: any[] = [
  // To be populated later
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
