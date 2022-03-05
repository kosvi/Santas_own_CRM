import express from 'express';
import { getAllUsersWithGroups, getUsersBySearchString, getUserWithPermissions, disableSingleUser, enableDisabledUser, addNewUser, updateUser } from '../services/userService';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { validateToNumber, validateToString } from '../utils/validators';
import { RequestWithToken } from '../types';
import { authenticate } from '../utils/middleware';
import { checkReadPermission, checkWritePermission } from '../utils/checkPermission';
import { toNewPassword, toNewUser } from '../utils/apiValidators';
const router = express.Router();

router.use(authenticate);

router.get('/', (req: RequestWithToken, res, next) => {
  // make sure user has read permission to users
  try {
    checkReadPermission('users', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  if (req.query.name) {
    // ok, we try to find user by name
    getUsersBySearchString(validateToString(req.query.name))
      .then(users => {
        if (users instanceof Array && users.length < 1) {
          throw new ControllerError(404, 'no users found');
        }
        res.json(users);
      })
      .catch(error => {
        logger.logError(error);
        next(error);
      });
  } else {
    // else we will just return every single user in database
    getAllUsersWithGroups()
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        logger.logError(error);
        next(error);
      });
  }
});

router.get('/:id', (req: RequestWithToken, res, next) => {
  // make sure user has read permission to users
  try {
    checkReadPermission('users', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
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

router.put('/disable/:id', (req: RequestWithToken, res, next) => {
  // make sure user has write permission to users
  try {
    checkWritePermission('users', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  // make sure the ID given is a number
  let id: number;
  try {
    id = validateToNumber(Number(req.params.id));
  } catch (error) {
    next(new ControllerError(400, 'invalid id'));
    return;
  }
  // disable user or throw error to middleware to handle
  disableSingleUser(id)
    .then(user => {
      res.status(200).json({ msg: `${user.username} has been disabled` });
    })
    .catch(error => {
      logger.logError(error);
      if (error instanceof ControllerError) {
        next(error);
      } else {
        next(new ControllerError(500, 'unknown error'));
      }
    });
});

router.put('/enable/:id', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('users', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  let id: number;
  try {
    id = validateToNumber(Number(req.params.id));
  } catch (error) {
    next(new ControllerError(400, 'invalid id'));
    return;
  }
  enableDisabledUser(id)
    .then(user => {
      res.status(200).json({ msg: `${user.username} has been enabled` });
    })
    .catch(error => {
      logger.logError(error);
      if (error instanceof ControllerError) {
        next(error);
      } else {
        next(new ControllerError(500, 'unknown error'));
      }
    });
});

router.post('/', (req: RequestWithToken, res, next) => {
  try {
    checkWritePermission('users', req.permissions);
  } catch (error) {
    next(error);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const user = toNewUser(req.body);
  let groupId: number | undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    groupId = validateToNumber(req.body.groupId);
  } catch (error) {
    logger.logError(error);
  }
  addNewUser(user, groupId)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      logger.logError(error);
      next(error);
    });
});

router.put('/:id', (req: RequestWithToken, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const payload = toNewPassword(req.body);
  // We should try & catch this...
  const id = validateToNumber(Number(req.params.id));
  if (req.decodedToken && req.decodedToken.id !== id) {
    // user is not trying to update own password, we need write access
    try {
      checkWritePermission('users', req.permissions);
    } catch (error) {
      next(error);
      return;
    }
  }
  // Ok, we are either an admin or trying to update own user account
  updateUser(id, payload.password)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      next(error);
    });
});

export default router;
