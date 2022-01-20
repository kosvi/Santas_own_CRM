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
const router = express.Router();

router.delete('/clear', (_req, res) => {
  resetDB().catch((error) => logger.logError(error));
  res.send('ok!');
});

router.post('/populate', (_req, res) => {
  addData().catch((error) => logger.logError(error));
  res.send('ok!');
});

// We should return 500 if we experience error.
// This is a dev/test endpoint, we won't spend energy on handling errors...
router.post('/full', (_req, res) => {
  resetDB().then(() => {
    addData().then(value => {
      // addData return true on success, let's tell user when reset has been succesfull
      value ? res.json({ msg: 'database re-populated' }) : res.status(500).json({ msg: 'error resetting database' });
    }).catch((error) => {
      logger.logError(error);
      res.status(500).json({ error: 'database reset failed' });
    });
  })
    .catch((error) => {
      logger.logError(error);
      res.status(500).json({ error: 'database reset failed' });
    });
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

export default router;
