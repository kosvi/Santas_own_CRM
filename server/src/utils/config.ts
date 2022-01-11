import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.PORT);
export const PORT = process.env.PORT || 3001;
