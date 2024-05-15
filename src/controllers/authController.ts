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
      req.body.username,
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

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await AuthServices.forgotPassword(req.body.username);
    if (!response) {
      sendResponse(res, 404, null, 'User not found');
    }
    sendResponse(res, 200, response, 'Password reset successful');
  } catch (error) {
    const message = (error as Error).message || 'Failed to reset password';
    sendResponse(res, 400, null, message);
  }
};

export const AuthController = {
  login,
  forgotPassword,
};
