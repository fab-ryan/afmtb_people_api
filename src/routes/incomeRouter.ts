import { Router } from 'express';

import { validationMiddleware, isAuthenticated } from '../middlewares';
import { incomeSchema } from '../schemas';
import { incomeController } from '../controllers';

const incomeRouter = Router();

incomeRouter.post(
  '/incomes',
  isAuthenticated,
  validationMiddleware(incomeSchema),
  incomeController.createIncome
);
incomeRouter.get(
  '/incomes',
  isAuthenticated,
  incomeController.getAccountIncome
);

export { incomeRouter };
