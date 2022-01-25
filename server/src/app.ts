import express from 'express';
import { resetRouter, versionRouter, userRouter, groupRouter, peopleRouter, itemRouter } from './controllers';
import { NODE_ENV } from './utils/config';
import { errorHandler } from './utils/middleware';

const app = express();
app.use(express.json());

app.use(express.static('build'));
app.use('/api/version', versionRouter);
app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/api/people', peopleRouter);
app.use('/api/items', itemRouter);

// resetting database should only be allowed in develop and test modes
if (NODE_ENV === 'develop' || NODE_ENV === 'test') {
  app.use('/api/reset', resetRouter);
}


// add error-handler to handle errors
app.use(errorHandler);

export default app;
