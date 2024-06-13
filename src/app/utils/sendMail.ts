import nodemailer from 'nodemailer';
import config from '../config';

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'ibrahimsikder5033@gmail.com',
      pass: 'fbnr amij axjs zpdd',
    },
  });

  await transporter.sendMail({
    from: 'ibrahimsikder5033@gmail.com', // sender address
    to,
    subject: 'Reset your password withing 10ms', // Subject line
    text: 'Hello world?', // plain text body
    html,
  });
};
