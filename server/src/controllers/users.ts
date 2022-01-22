import express from 'express';
import { getAllUsersWithGroups, getUserWithPermissions } from '../services/userService';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { validateToNumber } from '../utils/validators';
const router = express.Router();

router.get('/', (_req, res, next) => {
  getAllUsersWithGroups()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  let id: number;
  // get value to id or log error
  try {
    id = validateToNumber(Number(req.params.id));
  }
  catch (e) {
    let message = 'message unavailable';
    if (e instanceof Error) {
      message = e.message;
    }
    next(new ControllerError(400, message));
    return;
  }
  // now get user by given id
  getUserWithPermissions(id)
    .then(user => {
      if (!user) {
        throw new ControllerError(404, `no user found with id ${id}`);
      }
      res.json(user);
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

export default router;