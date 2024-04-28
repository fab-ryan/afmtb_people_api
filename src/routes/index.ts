import { Router, Request, Response } from 'express';
import { userRouter } from './userRouter';
import { sendResponse } from '../utils';

const router = Router();
const routers: Router[] = [userRouter];

router.use('/api', ...routers);
router.get('/', (req: Request, res: Response) => {
  sendResponse(res, 200, 'Welcome to the API!');
});

router.use((req: Request, res: Response) => {
  sendResponse(res, 404, 'Resource not found!');
});

export { router };
