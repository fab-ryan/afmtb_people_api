/* eslint-disable require-jsdoc */
import { Request, Response } from 'express';
import { UserService } from '../services';
import { sendResponse } from '../utils';
import { CreateUserRequest } from '../types';

interface UserRequest extends Request {
  body: CreateUserRequest;
}
const createUser = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const exist = await UserService.userExists(req.body.email);
    if (exist) {
      sendResponse(res, 400, null, 'User already exists!');
      return;
    }
    const user = await UserService.createUser(req.body);
    sendResponse(res, 201, user, 'User created successfully!');
  } catch (error) {
    const message = (error as Error).message || 'Failed to create user';
    sendResponse(res, 400, null, message);
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    sendResponse(res, 200, users, 'Users retrieved successfully!');
  } catch (error) {
    const message = (error as Error).message || 'Failed to get users';
    sendResponse(res, 400, null, message);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
};
