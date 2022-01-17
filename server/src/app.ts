import express from 'express';
import { helloRouter, resetRouter, versionRouter } from './controllers';

const app = express();

app.use(express.static('build'));
app.use('/api/version', versionRouter);
app.use('/api/reset', resetRouter);
app.use('/api', helloRouter);

export default app;