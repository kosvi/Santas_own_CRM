import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const DATABASE_URL = process.env.DATABASE_URL;
export const POSTGRES_SSL = process.env.POSTGRES_SSL || false;
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const SECRET = process.env.SECRET;
