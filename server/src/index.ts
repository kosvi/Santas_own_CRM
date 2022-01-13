import app from './app';
import http from 'http';
import { PORT } from './utils/config';
// import { connectionToDatabase } from './utils/db';

const server = http.createServer(app);

// server.listen(PORT, () => {
//  console.log(`Server running on port ${PORT}`);
//});

const start = async () => {
  // await connectionToDatabase();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
