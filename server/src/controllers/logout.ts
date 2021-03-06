import express from 'express';
import { logoutAllSessionsOfCurrentUser, logoutAllSessionsOfAnotherUser, logoutSingleSession } from '../services/logoutService';
import { RequestWithToken } from '../types';
import { checkWritePermission } from '../utils/checkPermission';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { authenticate } from '../utils/middleware';
const router = express.Router();

// we use authenticate middleware to decode the token from request
router.use(authenticate);

router.delete('/', (req: RequestWithToken, res, next) => {
  logoutAllSessionsOfCurrentUser(req.decodedToken)
    .then(() => {
      res.json({ msg: 'logged out' });
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

router.delete('/user/:id', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('users', req.permissions);
  } catch(error) {
    next(error);
    return;
  }
  logoutAllSessionsOfAnotherUser(req.params.id)
    .then(result => {
      res.json({msg: `${result} sessions deleted`});
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

router.delete('/session/:token', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('users', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  logoutSingleSession(req.params.token)
    .then(result => {
      if (result) {
        res.status(204).send();
      } else {
        next(new ControllerError(404, 'no session was found with given token'));
      }
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

export default router;
