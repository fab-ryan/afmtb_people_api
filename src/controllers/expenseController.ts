import { Request, Response } from 'express';
import { sendResponse } from '../utils';
import { ExpenseService } from '../services';

const createExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user as { id: string };
    const expense = await ExpenseService.create({
      ...req.body,
      user_id: id,
    });
    return sendResponse(res, 201, expense, 'Expense created successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, error, message);
  }
};

const getAllExpenses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const expenses = await ExpenseService.findAll();
    return sendResponse(
      res,
      200,
      expenses,
      'All expenses retrieved successfully'
    );
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, error, message);
  }
};

const getExpenseById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const expense = await ExpenseService.findById(Number(id));
    if (!expense) {
      return sendResponse(res, 404, null, 'Expense not found');
    }
    return sendResponse(res, 200, expense, 'Expense retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, error, message);
  }
};

const updateExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const expense = await ExpenseService.update(Number(id), req.body);
    if (!expense) {
      return sendResponse(res, 404, null, 'Expense not found');
    }
    return sendResponse(res, 200, expense, 'Expense updated successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, error, message);
  }
};

const deleteExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const expense = await ExpenseService.delete(Number(id));
    if (!expense) {
      return sendResponse(res, 404, null, 'Expense not found');
    }
    return sendResponse(res, 200, null, 'Expense deleted successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, error, message);
  }
};

/**
 * Expense controller
 * @module ExpenseController
 * @exports createExpense
 * @exports getAllExpenses
 * @exports getExpenseById
 * @exports updateExpense
 * @exports deleteExpense
 */
const ExpenseController = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};

export { ExpenseController };
