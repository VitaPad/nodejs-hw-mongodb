import { Contact } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  return await Contact.find({});
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};
export const addContact = async (data) => {
  return await Contact.create(data);
};
export const upserContact = async (filter, data, options = {}) => {
  const result = await Contact.findOneAndUpdate(filter, data, {
    /*   new: true,
    runValidators: true, */
    includeResultMetadata: true,
    ...options,
  });
  if (!result || !result.value) return null;
  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    data: result.value,
    isNew,
  };
};

export const deleteContact = (filter) => Contact.findByIdAndDelete(filter);
