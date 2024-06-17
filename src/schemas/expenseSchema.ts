import Joi from 'joi';

export const expenseCategorySchema = Joi.object({
  name: Joi.string().required(),
});

export const expenseSchema = Joi.object({
  amount: Joi.number().required(),
  category_id: Joi.number().required(),
  comment: Joi.string().optional(),
});
