/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.number().min(6).required().messages({
    'string.max': 'PIN must be at least 4 characters long',
    'any.required': 'PIN is required',
    'string.empty': 'PIN cannot be empty',
    'string.base': 'PIN must be a number',
  }),
  phone: Joi.string()
    .min(10)
    .max(12)
    .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
    .messages({
      'string.pattern.base':
        'Invalid phone number Must start with 078, 073, 072 or 079',
    })
    .optional(),
});

export const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .when('email', {
      is: Joi.exist(),
      then: Joi.string().email().required(),
    })
    .when('phone', {
      is: Joi.exist(),
      then: Joi.string()
        .min(10)
        .max(12)
        .required()
        .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
        .messages({
          'string.pattern.base':
            'Invalid phone number Must start with 078, 073, 072 or 079',
        }),
    })
    .messages({
      'string.email': 'Invalid email',
      'any.required': 'Email is required',
    }),
  password: Joi.number().required().messages({
    'string.max': 'PIN must be at least 4 characters long',
    'any.required': 'PIN is required',
    'string.empty': 'PIN cannot be empty',
    'string.base': 'PIN must be a number',
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
      'string.pattern.base':
        'Invalid phone number Must start with 078, 073, 072 or 079',
    }),
  account_number: Joi.string()
    .min(10)
    .max(15)
    .regex(/^[0-9]+$/),
  bank_name: Joi.string(),
  bank_branch: Joi.string(),
});

export const forgotPasswordSchema = Joi.object({
  username: Joi.string()
    .required()
    .when('email', {
      is: Joi.exist(),
      then: Joi.string().email().required(),
    })
    .when('phone', {
      is: Joi.exist(),
      then: Joi.string()
        .min(10)
        .max(12)
        .required()
        .regex(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
        .messages({
          'string.pattern.base':
            'Invalid phone number Must start with 078, 073, 072 or 079',
        }),
    }),
});
