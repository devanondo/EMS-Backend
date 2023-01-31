import dotenv from 'dotenv';
dotenv.config();

const { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, CLOUD_NAME, API_KEY, API_SECRET } =
  process.env;

export { PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, CLOUD_NAME, API_KEY, API_SECRET };
