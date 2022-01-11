import express from 'express';
const app = express();

app.get('/api', (_req, res) => {
  res.json({ msg: 'Hello World!' });
});

app.use(express.static('../../client/build'));

export default app;