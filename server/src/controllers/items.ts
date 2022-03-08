import express from 'express';
import { listMostCommonItems } from '../services/itemService';
import { RequestWithToken } from '../types';
import { checkReadPermission } from '../utils/checkPermission';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { authenticate } from '../utils/middleware';
import { validateToNumber, validateToString } from '../utils/validators';
const router = express.Router();

router.use(authenticate);

router.get('/', (req: RequestWithToken, res, next) => {
  try {
    checkReadPermission('wishes_and_items', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  let limit = 0;
  if (req.query.limit) {
    try {
      // We have to validate that parseInt didn't return NaN
      limit = validateToNumber(parseInt(validateToString(req.query.limit)));
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
