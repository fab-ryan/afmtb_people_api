import { Router } from 'express';

import {
  validationMiddleware,
  isAuthenticated,
  requestType,
} from '../middlewares';
import { expenseSchema, uuidSchema } from '../schemas';
import { ExpenseController } from '../controllers';

const router = Router();

router.post(
  '/expenses',
  isAuthenticated,
  validationMiddleware(expenseSchema, requestType.body),
  ExpenseController.createExpense
);
router.get('/expenses', isAuthenticated, ExpenseController.getAllExpenses);
router.get(
  '/expenses/user',
  isAuthenticated,
  ExpenseController.getExpensesByUserId
);
router.get(
  '/expenses/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),

  ExpenseController.getExpenseById
);

router.patch(
  '/expenses/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),
  validationMiddleware(expenseSchema, requestType.body),
  ExpenseController.updateExpense
);

router.delete(
  '/expenses/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),
  ExpenseController.deleteExpense
);

export { router as expenseRouter };
