import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // needed so authenticate.middleware.ts can read req.cookies.token
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;