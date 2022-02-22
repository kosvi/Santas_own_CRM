import express from 'express';
import { addWishToPerson } from '../services/wishService';
import { NewWish, RequestWithToken } from '../types';
import { toNewWish } from '../utils/apiValidators';
import { checkWritePermission } from '../utils/checkPermission';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { authenticate } from '../utils/middleware';
const router = express.Router();

router.use(authenticate);

router.post('/', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('wishes_and_items', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  let newWish: NewWish;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    newWish = toNewWish(req.body);
  } catch (error) {
    next(new ControllerError(400, 'malformed request'));
    return;
  }
  // everything is ready, let's store the wish
  addWishToPerson(newWish.personId, newWish.itemName, newWish.description)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

export default router;