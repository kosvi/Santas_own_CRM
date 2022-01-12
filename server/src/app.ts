import express from 'express';
const app = express();

app.use(express.static('build'));

app.get('/api', (_req, res) => {
  res.json({ msg: 'Hello World' });
});

app.get('/api/version', (_req, res) => {
  res.send('0.0.1');
});

export default app;