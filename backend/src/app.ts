import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true); // curl/Postman/server-to-server - no Origin header
      if (allowedOrigins.includes(origin)) return callback(null, true);
      try {
        if (new URL(origin).hostname.endsWith('.vercel.app')) return callback(null, true);
      } catch {
        // malformed Origin header - fall through to reject
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;