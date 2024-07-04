import Joi from 'joi';
import { typeEmail, typeList } from '../constants/contacts-constans.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().min(6).max(12).required(),
  email: Joi.string().pattern(typeEmail).required(),
  contactType: Joi.string().valid(...typeList),
  isFavourite: Joi.boolean(),
});

export const createUpdateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.number().min(6).max(12),
  email: Joi.string().pattern(typeEmail),
  contactType: Joi.string().valid(...typeList),
  isFavourite: Joi.boolean(),
});
