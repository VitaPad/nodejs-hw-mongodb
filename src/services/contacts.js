import { Contact } from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { saveFile } from '../utils/saveFile.js';
/* import { saveFileToLokalMachine } from '../utils/saveFileToLokalMachine.js'; */
/* import { saveToCloudinary } from '../utils/saveToCloudinary.js'; */

export const getAllContacts = async ({
  filter,
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;

  const totalItems = await Contact.countDocuments(filter);
  const data = await Contact.find(filter)
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

export const getContactById = async (filter) => {
  return await Contact.findOne(filter);
};
export const addContact = async (data) => {
  let photoUrl;
  if (data.photo) {
    photoUrl = await saveFile(data.photo);
  }

  /*   const photoUrl = await saveFile(data.photo); */

  const newData = { ...data, photoUrl };
  return await Contact.create(newData);
};
export const upserContact = async (filter, data, options = {}) => {
  let updatedData = { ...data };

  if (data.photo) {
    const photoUrl = await saveFile(data.photo);
    updatedData = { ...updatedData, photoUrl };
  }
  const result = await Contact.findOneAndUpdate(filter, updatedData, {
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
