import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';
import { saveFileToLokalMachine } from './saveFileToLokalMachine.js';
import { saveToCloudinary } from './saveToCloudinary.js';

export const saveFile = async (file) => {
  let url;
  if (env(ENV_VARS.ENABLE_CLOUDINARY) === 'false') {
    url = await saveFileToLokalMachine(file);
  } else {
    url = await saveToCloudinary(file);
  }

  return url;
};
