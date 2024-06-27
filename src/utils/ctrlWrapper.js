export const ctrlWrapper = (controller) => {
  const func = async (res, req, next) => {
    try {
      await controller(res, req, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
