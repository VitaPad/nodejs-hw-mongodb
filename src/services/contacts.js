import { Contact } from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;
  const totalItems = await Contact.countDocuments();
  const data = await Contact.find({})
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });
  return {
    data,
    totalItems,
    page,
    perPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
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
