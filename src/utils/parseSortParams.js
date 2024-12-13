import { sortOrderList } from '../constants/sort-constans.js';
import { contactFieldList } from '../constants/contacts-constans.js';

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  const parsedSortBy = contactFieldList.includes(sortBy) ? sortBy : '_id';
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
