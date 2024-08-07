import { Router } from 'express';
import { DepositController } from '../controllers';
import {
  isAuthenticated,
  validationMiddleware,
  requestType,
} from '../middlewares';
import { depositSchema, uuidSchema, updateDepositSchema } from '../schemas';

const router = Router();

router.post(
  '/deposits',
  isAuthenticated,
  validationMiddleware(depositSchema, requestType.body),
  DepositController.createDeposit
);
router.get('/deposits', isAuthenticated, DepositController.getDeposits);
router.get(
  '/deposits/:id',
  validationMiddleware(uuidSchema, requestType.params),
  DepositController.getDeposit
);
router.patch(
  '/deposits/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),
  validationMiddleware(updateDepositSchema, requestType.body),
  DepositController.updateDeposit
);
router.delete(
  '/deposits/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),
  DepositController.deleteDeposit
);

export { router as depositRouter };
