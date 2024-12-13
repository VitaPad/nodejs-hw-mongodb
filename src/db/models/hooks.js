export const mongooseSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const setUpdateSetting = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
