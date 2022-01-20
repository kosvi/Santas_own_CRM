import express from 'express';
const router = express.Router();
import { addGroup, getAllGroupsWithPermissions, getSingleGroupWithPermissions } from '../services/groupService';
import { logger } from '../utils/logger';
import { toNewGroup } from '../utils/toNewGroup';
import { GroupAttributes } from '../types';
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
        res.status(404).json({ msg: `no group found with name ${name}` });
      } else {
        res.json(group);
      }
    })
    .catch(error => {
      logger.logError(error);
    });
});

router.post('/', (req, res) => {
  // We can safely send req.body to toNewGroup because it will validate the body
  let group: GroupAttributes;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    group = toNewGroup(req.body);
  } catch (error) {
    // couldn't validate group
    let message = 'Error validating group';
    if (error instanceof Error) {
      message = `${message}: ${error.message}`;
    }
    res.status(400).json({ error: message });
    return;
  }
  addGroup(group).then(newGroup => {
    if (newGroup) {
      res.status(201).json(newGroup);
    } else {
      res.status(400).json({ msg: 'invalid group' });
    }
  }).catch(error => {
    logger.logError(error);
    res.status(400).json({ msg: 'couln\'t save the group' });
  });
});

export default router;
