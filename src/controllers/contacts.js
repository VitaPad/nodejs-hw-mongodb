import {
  getAllContacts,
  getContactById,
  addContact,
  upserContact,
  deleteContact,
} from '../services/contacts.js';
import createError from 'http-errors';

export const getAllContactController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    throw createError(404, `Student with id ${id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const id = req.params.contactId;
  const result = await upserContact({ _id: id }, req.body);
  if (!result) {
    throw createError(404, `Student with id ${id} not found`);
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const id = req.params.contactId;
  const result = await deleteContact({ _id: id });
  if (!result) {
    throw createError(404, `Student with id ${id} not found`);
  }
  res.json({
    status: 200,
    message: 'Contact not found',
    data: result,
  });
};
