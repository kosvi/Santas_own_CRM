import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  res.json({ msg: 'Hello World!' });
});

app.get('/api', (_req, res) => {
  res.json({msg: 'Hello World! Thank you...'});
});

app.

export default app;