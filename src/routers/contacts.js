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

export const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactController));

contactsRouter.get(
  '/:contactId',
  isvalidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch(
  '/:contactId',
  isvalidId,
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isvalidId,
  ctrlWrapper(deleteContactController),
);
