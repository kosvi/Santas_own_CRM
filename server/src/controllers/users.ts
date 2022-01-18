import express from 'express';
import { getAllUsersWithGroups, getUserWithPermissions } from '../services/userService';
import { logger } from '../utils/logger';
import { validateToNumber } from '../utils/validators';
const router = express.Router();

router.get('/', (_req, res) => {
  getAllUsersWithGroups()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      logError(error);
    });
});

router.get('/:id', (req, res) => {
  let id: number;
  // get value to id or set to 0 and log error
  try {
    id = validateToNumber(Number(req.params.id));
  }
  catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'malformed request' });
    }
    return;
  }
  // now get user by given id
  getUserWithPermissions(id)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      logError(error);
    });
});

const logError = (error: unknown) => {
  if (error instanceof Error) {
    logger.error(error.message);
  }
};

export default router;