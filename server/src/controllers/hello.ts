import express from 'express';
const router = express.Router();

// FRONTEND STILL NEEDS THIS, REMOVE AS SOON AS POSSIBLE
router.get('/', (_req, res) => {
  res.json({ msg: 'Hello World' });
});

router.get('/health', (_req, res) => {
  res.send('OK!');
});

export default router;
