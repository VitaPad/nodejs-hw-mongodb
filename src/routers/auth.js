import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  sendResetPasswordEmailSchema,
} from '../validation/auth.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  refreshController,
  registerUserController,
  sendResetPasswordEmailController,
} from '../controllers/auth.js';
import { getAllContactController } from '../controllers/contacts.js';

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

authRouter.post('/refresh', ctrlWrapper(refreshController));

/* authRouter.use(authenticate); */

authRouter.get('/', ctrlWrapper(getAllContactController));

authRouter.post(
  '/request-reset-email',
  validateBody(sendResetPasswordEmailSchema),
  ctrlWrapper(sendResetPasswordEmailController),
);
