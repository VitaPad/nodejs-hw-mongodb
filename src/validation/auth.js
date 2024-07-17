import Joi from 'joi';
import { emailRegexp } from '../constants/user-constans.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const sendResetPasswordEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
