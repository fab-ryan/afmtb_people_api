import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils';
import { userRouter } from './userRouter';
import { incomeRouter } from './incomeRouter';
import { depositRouter } from './depositRouter';
import { expenseCategoryRouter } from './expenseCategoryRouter';
import { expenseRouter } from './expenseRouter';
import { dashboardRouter } from './dashboardRouter';
import { withdrawRouter } from './withdrawRouter';

const router = Router();
const routers: Router[] = [
  userRouter,
  incomeRouter,
  depositRouter,
  expenseCategoryRouter,
  expenseRouter,
  dashboardRouter,
  withdrawRouter,
];

router.use('/api', ...routers);
router.get('/', (req: Request, res: Response) => {
  sendResponse(res, 200, 'Welcome to the API!');
});

router.use((req: Request, res: Response) => {
  sendResponse(res, 404, 'Resource not found!');
});

export { router };
