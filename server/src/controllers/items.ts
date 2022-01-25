import express from 'express';
import { listMostCommonItems } from '../services/itemService';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { validateToString } from '../utils/validators';
const router = express.Router();

router.get('/', (req, res, next) => {
  let limit = 0;
  if (req.query.limit) {
    try {
      limit = parseInt(validateToString(req.query.limit));
    } catch (error) {
      throw new ControllerError(400, 'limit has to be an integer');
    }
  }
  listMostCommonItems(limit).then(items => {
    res.json(items);
  })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

export default router;
