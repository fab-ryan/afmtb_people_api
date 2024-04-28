import { Router } from 'express';
import { UserController } from '../controllers';
import { validationMiddleware } from '../middlewares';
import { userSchema } from '../schemas';

const userRouter = Router();

userRouter.post(
  '/users',
  validationMiddleware(userSchema),
  UserController.createUser
);
userRouter.get('/users', UserController.getAllUsers);

export { userRouter };
