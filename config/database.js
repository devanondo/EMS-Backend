import mongoose from 'mongoose';
import { MONGO_URI } from './siteEnv.js';

export const connectDatabase = () => {
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
