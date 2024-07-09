import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isvalidId } from '../middlewares/isValidId.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { getAllContactController } from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

export const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.use(authenticate);

authRouter.get('/', ctrlWrapper(getAllContactController));
