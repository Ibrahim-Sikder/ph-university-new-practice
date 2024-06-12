import express, { Application } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandlers';
import { notFound } from './app/middlewares/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000/'] }));

// application route
app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
