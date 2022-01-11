import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  res.json({ msg: 'Hello World!' });
});

export default app;