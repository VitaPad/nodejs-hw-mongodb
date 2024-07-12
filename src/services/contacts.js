import { Contact } from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  filter,
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;
  let query = {};

  if (filter && filter.userId) {
    query.userId = filter.userId;
  }
  const totalItems = await Contact.countDocuments(query);
  const data = await Contact.find(query)
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
  const newData = { ...data };
  return await Contact.create(newData);
};
export const upserContact = async (filter, data, options = {}) => {
  const result = await Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
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
