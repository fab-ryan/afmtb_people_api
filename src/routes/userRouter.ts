import { Router } from 'express';
import { UserController, AuthController } from '../controllers';
import {
  validationMiddleware,
  isAuthenticated,
  isAdmin,
  multerUploads,
} from '../middlewares';
import {
  loginSchema,
  updateUserSchema,
  userSchema,
  forgotPasswordSchema,
} from '../schemas';

const userRouter = Router();

userRouter.post(
  '/users',
  validationMiddleware(userSchema),
  UserController.createUser
);
userRouter.get('/users', isAuthenticated, isAdmin, UserController.getAllUsers);
userRouter.get('/users/:id', isAuthenticated, UserController.getUserById);
userRouter.get('/profile', isAuthenticated, UserController.getUserById);
userRouter.post(
  '/login',
  validationMiddleware(loginSchema),
  AuthController.login
);

userRouter.post(
  '/forgot-password',
  validationMiddleware(forgotPasswordSchema),
  AuthController.forgotPassword
);

userRouter.patch(
  '/profile',
  isAuthenticated,
  multerUploads.single('profile'),
  validationMiddleware(updateUserSchema),
  UserController.updateUserProfile
);

export { userRouter };
