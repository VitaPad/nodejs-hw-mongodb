export const notFoundMiddlewares =
  ('*',
  (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
    next();
  });
