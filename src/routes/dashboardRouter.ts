import { Router } from 'express';
import { DashboardController } from '../controllers';

import { isAuthenticated } from '../middlewares';

const router = Router();

router.get('/stats', isAuthenticated, DashboardController.dashboardCounts);

export { router as dashboardRouter };
