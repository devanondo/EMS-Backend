import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import { API_KEY, API_SECRET, CLOUD_NAME } from './config/siteEnv.js';

import cloudinary from 'cloudinary';
import globalErrorHandler from './controllers/errorController.js';
import router from './routes/index.js';
import AppError from './utils/appError.js';

// const cloudinary = require('cloudinary').v2;
const app = express();

const options = [
  cors({
    origin: '*',
  }),
  logger('tiny'),
  helmet(),
  express.json({ limit: '30mb' }),
  cookieParser(),
];
app.use(options);

// Configuration
cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

app.get('/', (req, res) =>
  res.json({
    status: 'success',
    message: 'Server is running wow!',
  })
);

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
