import express from 'express';
import { addNewEntry, getLatestEntries } from '../services/entryService';
import { RequestWithToken } from '../types';
import { toNewEntry } from '../utils/apiValidators';
import { checkReadPermission, checkWritePermission } from '../utils/checkPermission';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { authenticate } from '../utils/middleware';
import { validateToString } from '../utils/validators';
const router = express.Router();

// This router needs permission from user - anonymous use is not allowed
router.use(authenticate);

/*
 * Default endpoint returns latest entries, 
 * limit is an optional argument that can be used to limit the amount of entries returned
 */
router.get('/', (req: RequestWithToken, res, next) => {
  try {
    checkReadPermission('entries', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  // eslint-disable-next-line no-console
  let limit: string;
  if (req.query.limit) {
    limit = validateToString(req.query.limit);
  } else {
    // We can set this to anything we want as long as it doesn't parse int. 
    // if parseInt return NaN and we call getLatestEntries with NaN, it's going to use default value
    limit = '';
  }
  getLatestEntries(parseInt(limit))
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('entries', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  // we will get userId from middleware later on, for now we hardcode
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry({ ...req.body, userId: req.decodedToken?.id });
    addNewEntry(newEntry)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        logger.logError(error);
        let message = 'failed to create entry';
        if (error instanceof Error) {
          message = `${message}: ${error.name}`;
        }
        next(new ControllerError(400, message));
      });
  } catch (error) {
    if (error instanceof Error) {
      next(new ControllerError(400, error.message));
    }
    next(error);
  }
});

export default router;