import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddlewares } from './middlewares/notFoundMiddlewares.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter } from './routers/auth.js';
import { authenticate } from './middlewares/authenticate.js';

dotenv.config();

const PORT = env(ENV_VARS.PORT, '3000');

export function setupServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use(pino());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(authenticate);
  app.use('/auth', authRouter);

  app.use('/contacts', contactsRouter);

  app.use(notFoundMiddlewares);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
