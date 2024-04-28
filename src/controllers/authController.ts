import { Request, Response } from 'express';
import { AuthServices } from '../services';
import { sendResponse } from '../utils';
import { LoginRequest } from '../types';

interface AuthRequest extends Request {
  body: LoginRequest;
}

const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const token = await AuthServices.loginService(
      req.body.email,
      req.body.password
    );
    if (!token) {
      sendResponse(res, 401, null, 'Invalid credentials');
      return;
    }
    sendResponse(res, 200, { token }, 'Login successful');
  } catch (error) {
    const message = (error as Error).message || 'Failed to login';
    sendResponse(res, 400, null, message);
  }
};

export const AuthController = {
  login,
};
