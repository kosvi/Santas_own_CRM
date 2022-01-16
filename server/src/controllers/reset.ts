import express from 'express';
import { addData, resetDB } from '../services/resetService';
import { runMigration } from '../utils/db';
// import { logger } from '../utils/logger';
const router = express.Router();

router.get('/down', (_req, res) => {
  runMigration('down').catch((error) => console.log(error));
  res.send('ok!');
});

router.get('/up', (_req, res) => {
  runMigration('up').catch((error) => console.log(error));
  res.send('ok!');
});

router.get('/populate', (_req, res) => {
  addData().catch((error) => console.log(error));
  res.send('ok!');
});

router.get('/full', (_req, res) => {
  resetDB().then(() => console.log('eka')).catch(() => console.error('toka'));
  console.log('kolmas');
  res.send('ok');
});

export default router;