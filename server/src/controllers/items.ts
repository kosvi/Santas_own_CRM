import express from 'express';
import { listMostCommonItems } from '../services/itemService';
import { logger } from '../utils/logger';
// import { validateToString } from '../utils/validators';
const router = express.Router();

router.get('/', (_req, res, next) => {
  listMostCommonItems(10).then(items => {
    res.json(items);
  })
   .catch(error => {
      logger.logError(error);
      next(error);
     });
});

export default router;
