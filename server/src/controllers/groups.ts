import express from 'express';
const router = express.Router();
import { addGroup, addPermission, getAllGroupsWithPermissions, getSingleGroupWithPermissions } from '../services/groupService';
import { logger } from '../utils/logger';
import { toNewGroup, toNewPermission } from '../utils/apiValidators';
import { GroupAttributes, PermissionAttributes } from '../types';
import { validateToString } from '../utils/validators';
import { ControllerError } from '../utils/customError';

router.get('/', (_req, res, next) => {
  getAllGroupsWithPermissions()
    .then(groups => {
      res.json(groups);
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

router.get('/:name', (req, res, next) => {
  let name: string;
  try {
    name = validateToString(req.params.name);
  } catch (error) {
    let message = 'error validating group name';
    if (error instanceof Error) {
      message = `${message}: ${error.message}`;
    }
    next(new ControllerError(400, message));
    name = '';
  }
  getSingleGroupWithPermissions(name)
    .then(group => {
      res.json(group);
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  const groupId = Number(req.params.id);
  let permission: PermissionAttributes;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    permission = toNewPermission({ ...req.body, groupId: groupId });
  } catch (error) {
    let message = 'Error validating request';
    if (error instanceof Error) {
      message = `${message}: ${error.message}`;
      next(new ControllerError(400, message));
    }
    next(error);
    return;
  }
  // now we should have a valid formed PermissionAttributes in 'permission'
  addPermission(permission).then(response => {
    res.status(201).json(response);
  })
    .catch(error => {
      logger.logError(error);
      if (error instanceof ControllerError) {
        next(error);
      }
      // if error isn't ControllerError, I guess we are in trouble. Let's give 500!
      let message = 'Server encountered an error';
      if (error instanceof Error) {
        message = `${message}: ${error.message}`;
      }
      next(new ControllerError(500, message));
    });
});

router.post('/', (req, res, next) => {
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
    next(new ControllerError(400, message));
    return;
  }
  // addGroup should either resolve to 'GroupAttributes' or 'Error'
  // if Error, we can read the error and give response according to that
  // (this could probably be handled in middleware?)
  addGroup(group).then(newGroup => {
    if (newGroup) {
      if (newGroup instanceof Error) {
        next(newGroup);
      } else {
        res.status(201).json(newGroup);
      }
    }
  }).catch(error => {
    logger.logError(error);
    next(new ControllerError(500, 'couldn\'t save the group'));
  });
});

export default router;
