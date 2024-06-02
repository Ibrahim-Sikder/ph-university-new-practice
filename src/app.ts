import express, { Application } from 'express';
import cors from 'cors'
import { globalErrorHandler } from './app/middlewares/globalErrorHandlers';
import { notFound } from './app/middlewares/notFoundRoute';
import router from './app/routes';


const app:Application = express()

// parser
app.use(express.json());
app.use(cors());


// application route 
app.use('/api/v1/', router)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(notFound)
app.use(globalErrorHandler)



export default app;
