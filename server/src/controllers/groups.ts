import express from 'express';
const router = express.Router();
import { addGroup, addPermission, getAllGroupsWithPermissions, getSingleGroupWithPermissions } from '../services/groupService';
import { logger } from '../utils/logger';
import { toNewGroup, toNewPermission } from '../utils/groupsApiValidators';
import { GroupAttributes, PermissionAttributes } from '../types';
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

router.post('/:id', (req, res) => {
  const groupId = Number(req.params.id);
  let permission: PermissionAttributes;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    permission = toNewPermission(req.body);
    if (permission.groupId !== groupId) {
      throw new Error('groupId does not match with url');
    }
  } catch (error) {
    let message = 'Error validating request';
    if (error instanceof Error) {
      message = `${message}: ${error.message}`;
    }
    res.status(400).json({ error: message });
    return;
  }
  // now we should have a valid formed PermissionAttributes in 'permission'
  addPermission(permission).then(response => {
    if (response instanceof Error) {
      res.status(400).json({ error: response.name });
    } else if (response) {
      res.status(201).json(response);
    }
  })
    .catch(error => {
      logger.logError(error);
      let message = 'Server encountered an error';
      if (error instanceof Error) {
        message = `${message}: ${error.message}`;
      }
      res.status(500).json({ error: message });
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
  // addGroup should either resolve to 'GroupAttributes' or 'Error'
  // if Error, we can read the error and give response according to that
  // (this could probably be handled in middleware?)
  addGroup(group).then(newGroup => {
    if (newGroup) {
      if (newGroup instanceof Error) {
        if (newGroup.name === 'SequelizeUniqueConstraintError') {
          res.status(403).json({ error: 'group with that name already exists' });
        } else {
          res.status(400).json({ error: newGroup.name });
        }
      } else {
        res.status(201).json(newGroup);
      }
    }
  }).catch(error => {
    logger.logError(error);
    res.status(400).json({ error: 'couldn\'t save the group' });
  });
});

export default router;
