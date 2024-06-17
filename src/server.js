import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddlewares } from './middlewares/notFoundMiddlewares.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const PORT = env(ENV_VARS.PORT, '3000');

export function setupServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use(pino());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({
        stateus: 404,
        message: `Student with id ${id} not found`,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  });

  app.use(errorHandlerMiddleware);
  app.use(notFoundMiddlewares);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
