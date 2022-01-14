import express from 'express';
import { helloRouter, resetRouter } from './controllers';

const app = express();

app.use(express.static('build'));
app.use('/api/reset', resetRouter);
app.use('/api', helloRouter);

export default app;