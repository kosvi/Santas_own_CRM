import app from './app';
import http from 'http';
import { PORT } from './utils/config';
import { connectionToDatabase } from './utils/db';
import { logger } from './utils/logger';

const server = http.createServer(app);

const start = async () => {
  // connectionToDatabase() basically just tests connection to DB and runs migrations if they are not up-to-date
  await connectionToDatabase();
  server.listen(PORT, () => {
    logger.log(`Server running on port ${PORT}`);
  });
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
