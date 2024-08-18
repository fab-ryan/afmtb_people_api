import { Router } from 'express';
import { WithdrawController } from '../controllers';
import {
  isAuthenticated,
  validationMiddleware,
  requestType,
} from '../middlewares';

import { withdrawSchema, uuidSchema, updateWithdrawSchema } from '../schemas';

const router = Router();

router.post(
  '/withdraws',
  isAuthenticated,
  validationMiddleware(withdrawSchema, requestType.body),
  WithdrawController.createWithdraw
);

router.get('/withdraws', isAuthenticated, WithdrawController.getWithdraws);

router.get(
  '/withdraws/:id',
  validationMiddleware(uuidSchema, requestType.params),
  WithdrawController.getWithdraw
);

router.patch(
  '/withdraws/:id',
  isAuthenticated,
  validationMiddleware(uuidSchema, requestType.params),
  validationMiddleware(updateWithdrawSchema, requestType.body),
  WithdrawController.updateWithdraw
);

// router.delete(
//   '/withdraws/:id',
//   isAuthenticated,
//   validationMiddleware(uuidSchema, requestType.params),
//   WithdrawController.deleteWithdraw
// );

export { router as withdrawRouter };
