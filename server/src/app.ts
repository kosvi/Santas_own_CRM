import express from 'express';
import { helloRouter, resetRouter } from './controllers';
import { NODE_ENV } from './utils/config';

const app = express();

app.use(express.static('build'));
if (NODE_ENV !== 'TEST') {
  app.use('/api/reset', resetRouter);
}
app.use('/api', helloRouter);

export default app;