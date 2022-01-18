import express from 'express';
import { resetRouter, versionRouter } from './controllers';
import { NODE_ENV } from './utils/config';

const app = express();

app.use(express.static('build'));
app.use('/api/version', versionRouter);
if (NODE_ENV === 'develop' || NODE_ENV === 'test') {
  app.use('/api/reset', resetRouter);
}

export default app;