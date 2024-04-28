/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
});

export const updateUserSchema = Joi.object({
  age: Joi.number().integer().min(18).max(120),
  address: Joi.string(),
  phone: Joi.string()
    .min(10)
    .max(12)
    .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
    .messages({
      'string.pattern.base': 'Invalid phone number',
    }),
  account_number: Joi.string()
    .min(10)
    .max(15)
    .regex(/^[0-9]+$/),
  bank_name: Joi.string(),
  bank_branch: Joi.string(),
});
