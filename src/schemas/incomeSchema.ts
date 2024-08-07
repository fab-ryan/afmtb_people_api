/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

export const incomeSchema = Joi.object({
  source: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string(),
});
