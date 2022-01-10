import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  console.log('working!');
  res.send('OK!');
});

export default app;