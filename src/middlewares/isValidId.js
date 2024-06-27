import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isvalidId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    return next(createHttpError(404, 'Route not found'));
  }
  next();
};
