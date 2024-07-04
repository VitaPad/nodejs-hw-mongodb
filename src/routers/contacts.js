import express from 'express';
import {
  addContactController,
  deleteContactController,
  getAllContactController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isvalidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  createUpdateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../utils/validateBody.js';

export const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactController));

contactsRouter.get(
  '/:contactId',
  isvalidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isvalidId,
  validateBody(createUpdateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isvalidId,
  ctrlWrapper(deleteContactController),
);
