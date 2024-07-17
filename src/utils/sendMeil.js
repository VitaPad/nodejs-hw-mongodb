import nodemailer from 'nodemailer';
import env from '../utils/env.js';
import { ENV_VARS } from '../constants';

const transporter = nodemailer.createTransport({
  host: env(ENV_VARS.SMTP_HOST),
  port: Number(env(ENV_VARS.SMTP_PORT)),
  auth: {
    user: env(ENV_VARS.SMTP_USER),
    pass: env(ENV_VARS.SMTP_PASSWORD),
  },
  from: env(ENV_VARS.SMTP_USER),
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
