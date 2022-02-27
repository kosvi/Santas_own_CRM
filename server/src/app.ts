import express from 'express';
import { resetRouter, versionRouter, userRouter, groupRouter, peopleRouter, itemRouter, entryRouter, loginRouter, logoutRouter, wishRouter } from './controllers';
import { NODE_ENV } from './utils/config';
import { errorHandler } from './utils/middleware';

const app = express();
app.use(express.json());

app.use('/api/version', versionRouter);
app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/api/people', peopleRouter);
app.use('/api/items', itemRouter);
app.use('/api/entries', entryRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/wishes', wishRouter);

// resetting database should only be allowed in develop and test modes
if (NODE_ENV === 'develop' || NODE_ENV === 'test') {
  app.use('/api/reset', resetRouter);
}

// rest of the requests are forwarded to index.html
app.use(express.static('build'));
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: 'build' });
});

// add error-handler to handle errors
app.use(errorHandler);

export default app;
