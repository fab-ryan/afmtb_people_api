import { Router } from 'express';
import { expenseCategoryController } from '../controllers';
import {
  isAuthenticated,
  validationMiddleware,
  requestType,
} from '../middlewares';
import { expenseCategorySchema, uuidSchema } from '../schemas';

const router = Router();

router.post(
  '/expense-category',
  isAuthenticated,
  validationMiddleware(expenseCategorySchema, requestType.body),
  expenseCategoryController.create
);
router.get('/expense-category', expenseCategoryController.findAll);
router.get(
  '/expense-category/:id',
  validationMiddleware(uuidSchema, requestType.params),
  expenseCategoryController.findById
);
router.patch(
  '/expense-category/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),
  validationMiddleware(expenseCategorySchema, requestType.body),
  expenseCategoryController.update
);
export { router as expenseCategoryRouter };
