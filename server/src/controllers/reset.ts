/*
 * This controller is for NODE_ENV = develop and NODE_ENV = test ONLY!!!
 * Should this be available in production, it most likely would cause 
 * SEVERE HARM 
 * 
 * This controller can be used to reset the whole database and populate 
 * it with some hardcoded test-data. DO NOT LEAVE THIS AVAILABLE IN PRODUCTION!
 */

import express from 'express';
import { addData, resetDB } from '../services/resetService';
import { runMigration } from '../utils/db';
import { logger } from '../utils/logger';
import { validateToString } from '../utils/validators';
// import { logger } from '../utils/logger';
const router = express.Router();

router.get('/down', (_req, res) => {
  runMigration('down').catch((error) => logError(error));
  res.send('ok!');
});

router.get('/up', (_req, res) => {
  runMigration('up').catch((error) => logError(error));
  res.send('ok!');
});

router.get('/populate', (_req, res) => {
  addData().catch((error) => logError(error));
  res.send('ok!');
});

router.get('/full', (_req, res) => {
  resetDB().then(() => {
    addData().catch(error => logError(error));
  })
    .catch(error => logError(error));
  res.send('ok');
});

const logError = (error: unknown) => {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    try {
      logger.error(validateToString(error));
    } catch (err) {
      console.error(err);
    }
  }
};

export default router;