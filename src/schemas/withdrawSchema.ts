import Joi from 'joi';

export const withdrawSchema = Joi.object({
  amount: Joi.number().required(),
  status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
});

export const updateWithdrawSchema = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
})
  .concat(withdrawSchema)
  .optional();
