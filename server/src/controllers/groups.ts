import express from 'express';
const router = express.Router();
import { getAllGroupsWithPermissions, getSingleGroupWithPermissions } from '../services/groupService';
import { logger } from '../utils/logger';
import { validateToString } from '../utils/validators';

router.get('/', (_req, res) => {
  getAllGroupsWithPermissions()
    .then(groups => {
      res.json(groups);
    })
    .catch(error => {
      logger.logError(error);
    });
});

router.get('/:name', (req, res) => {
  let name: string;
  try {
    name = validateToString(req.params.name);
  } catch (error) {
    let message = 'unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ error: message });
    return;
  }
  getSingleGroupWithPermissions(name)
    .then(group => {
      if (!group) {
        res.json({ msg: `no group found with name ${name}` });
      } else {
        res.json(group);
      }
    })
    .catch(error => {
      logger.logError(error);
    });
});

export default router;