import Joi from 'joi';
import { typeEmail, typeList } from '../constants/contacts-constans.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{3,20}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"phoneNumber" must be a valid phone number with 3 to 20 digits',
    }),
  email: Joi.string().pattern(typeEmail).required(),
  contactType: Joi.string().valid(...typeList),
  isFavourite: Joi.boolean(),
});

export const createUpdateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{3,20}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"phoneNumber" must be a valid phone number with 3 to 20 digits',
    }),
  email: Joi.string().pattern(typeEmail),
  contactType: Joi.string().valid(...typeList),
  isFavourite: Joi.boolean(),
});
