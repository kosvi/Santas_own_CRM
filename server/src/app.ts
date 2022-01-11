import express from 'express';
const app = express();

app.use(express.static('build'));

app.get('/api', (_req, res) => {
  res.json({ msg: 'Hello World' });
});

export default app;