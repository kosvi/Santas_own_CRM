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
import { logger } from '../utils/logger';
import { validateToString } from '../utils/validators';
const router = express.Router();

router.delete('/clear', (_req, res) => {
  resetDB().catch((error) => console.log(error));
  res.send('ok!');
});

router.post('/populate', (_req, res) => {
  addData().catch((error) => logError(error));
  res.send('ok!');
});

// We should return 500 if we experience error.
// This is a dev/test endpoint, we won't spend energy on handling errors...
router.post('/full', (_req, res) => {
  resetDB().then(() => {
    addData().then(value => value ? res.json({msg: 'database re-populated'}) : res.status(500).json({msg: 'error resetting database' })).catch((error) => logError(error));
  })
    .catch((error) => logError(error));
  res.send('ok');
});

router.get('/', (_req, res) => {
  res.send(`
  Functionalities:<br />
  <table>
  <tr>
  <td>Clear database</td><td>DELETE /api/reset/clear</td>
  </tr><tr>
  <td>Populate database</td><td>POST /api/reset/populate</td>
  </tr><tr>
  <td>Clear and populate database</td><td>POST /api/reset/full</td>
  </tr>
  </table>
  `);
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
