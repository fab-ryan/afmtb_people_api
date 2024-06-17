/* eslint-disable require-jsdoc */
import { Request, Response } from 'express';
import { UserService } from '../services';
import { fileUpload, sendResponse } from '../utils';
import { UserCreationAttributes } from '../database';

interface UserRequest extends Request {
  body: UserCreationAttributes;
}
const createUser = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const exist = await UserService.userExists(req.body.email);
    if (exist) {
      sendResponse(res, 400, null, 'User already exists!');
      return;
    }
    const phoneExist = await UserService.phoneExists(req.body.phone);
    if (phoneExist) {
      sendResponse(res, 400, null, 'Phone number already exists!');
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

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDetail = req.user as { id: string };
    const user = await UserService.getUserById(userDetail?.id);
    if (!user) {
      sendResponse(res, 404, null, 'User not found!');
      return;
    }
    sendResponse(res, 200, user, 'User retrieved successfully!');
  } catch (error) {
    const message = (error as Error).message || 'Failed to get user';
    sendResponse(res, 400, null, message);
  }
};

const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userDetail = req.user as { id: string };
    const user = await UserService.getUserById(userDetail?.id);
    if (!user) {
      sendResponse(res, 404, null, 'User not found!');
      return;
    }
    if (req.file) {
      req.body.profile_picture = await fileUpload(req);
    }

    const profile = await UserService.getProfile(user.profile?.id as string);
    if (profile) {
      await UserService.updateProfile(profile, req.body);
    } else {
      const updatedUser = await UserService.updateUserProfile(user, req.body);
      sendResponse(res, 200, updatedUser, 'User updated successfully!');
    }
  } catch (error) {
    const message = (error as Error).message || 'Failed to update user';
    sendResponse(res, 400, null, message);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
};
