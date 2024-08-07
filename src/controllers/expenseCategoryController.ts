import { Request, Response } from 'express';
import { ExpenseCategoryService } from '../services';
import { sendResponse } from '../utils';

const expenseCategoryController = {
  async create(req: Request, res: Response) {
    try {
      const expenseCategory = await ExpenseCategoryService.create(req.body);
      sendResponse(res, 201, expenseCategory);
    } catch (error) {
      sendResponse(res, 500, error);
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const expenseCategories = await ExpenseCategoryService.findAll();
      sendResponse(res, 200, expenseCategories);
    } catch (error) {
      sendResponse(res, 500, error);
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const expenseCategory = await ExpenseCategoryService.findById(Number(id));
      if (!expenseCategory) {
        sendResponse(res, 404, { message: 'ExpenseCategory not found' });
        return;
      }
      sendResponse(res, 200, expenseCategory);
    } catch (error) {
      sendResponse(res, 500, error);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const expenseCategory = await ExpenseCategoryService.update(
        Number(id),
        req.body
      );
      if (!expenseCategory) {
        sendResponse(res, 404, { message: 'ExpenseCategory not found' });
        return;
      }
      sendResponse(res, 200, expenseCategory);
    } catch (error) {
      sendResponse(res, 500, error);
    }
  },
};

export { expenseCategoryController };
