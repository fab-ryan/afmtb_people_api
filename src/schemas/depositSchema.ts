import Joi from 'joi';

export const depositSchema = Joi.object({
  source: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string(),
});

export const updateDepositSchema = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
})
  .concat(depositSchema)
  .optional();

export const uuidSchema = Joi.object({
  id: Joi.string().uuid().required(),
}).keys({
  id: Joi.string().uuid().required(),
});
