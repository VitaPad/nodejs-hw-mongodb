import HttpError from 'http-errors';

export const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
    });
    return;
  }
  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({
    status,
    message,
    data: error,
  });
};
