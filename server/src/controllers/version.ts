import express from 'express';
import { NODE_ENV } from '../utils/config';
import { logger } from '../utils/logger';
import { validateToString } from '../utils/validators';
const router = express.Router();

router.get('/', (_req, res) => {
  let version = 'unavailable';
  let license = 'unavailable';
  try { version = validateToString(process.env.npm_package_version); }
  catch (e) { logger.error('could\'t get version from env'); }
  try { license = validateToString(process.env.npm_package_license); }
  catch (e) { logger.error('couldn\'t get license from env'); }
  res.json({
    mode: NODE_ENV,
    version,
    license
  });
});

router.get('/health', (_req, res) => {
  res.send('OK!');
});

export default router;
