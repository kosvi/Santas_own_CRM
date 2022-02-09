import express from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from './config';
import { ControllerError } from './customError';
import { logger } from './logger';
import { validateToString, validateToObject } from './validators';
import { AccessTokenContent, RequestWithToken } from '../types';
import { getPermissionsOfGroup } from '../services/groupService';
import models from '../models';

export const errorHandler = (error: ControllerError | Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error handled by middleware: ${error.name}`);
  if (error instanceof ControllerError) {
    res.status(error.statusCode).json({ error: error.message });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(403).json({ error: `${error.message}: ${error.name}` });
  }
  /*
  if (error.name === 'SequelizeValidationError') {
    res.status(400).json({ error: `${error.message}: ${error.name}` });
  }
  if (error.name === 'SequelizeDatabaseError') {
    res.status(500).json({ error: `${error.message}: ${error.name}` });
  }
  */
  next(error);
};

export const authenticate = async (req: RequestWithToken, _res: express.Response, next: express.NextFunction) => {
  const auth = req.get('authorization');
  // See if auth has been set 
  try {
    validateToString(auth);
  } catch (error) {
    next(new ControllerError(401, 'invalid token'));
    return;
  }
  const tokenString = validateToString(auth).toLocaleLowerCase().startsWith('bearer ') ? validateToString(auth).substring(7) : undefined;
  // if auth didn't include bearer, we move on
  if (!tokenString) {
    next(new ControllerError(401, 'authentication required'));
    return;
  }
  // now we have something in the authorization header
  // make sure token is in database
  try {
    await models.Session.findOne({ where: { token: tokenString }, rejectOnEmpty: true });
  } catch (error) {
    // token wasn't found from DB, so the session is deleted
    next(new ControllerError(401, 'token expired'));
    return;
  }
  // session was found from DB, we continue
  try {
    if (!SECRET) {
      throw new ControllerError(500, 'Can\'t verify tokens');
    }
    const token = verify(tokenString, SECRET);
    // make sure we have all properties of AccessTokenContent in 'tokenProps' 
    const tokenProps: Array<keyof AccessTokenContent> = ['id', 'name', 'username', 'activeGroup'];
    // and then validate that token has all those properties
    if (validateToObject<AccessTokenContent>(token, tokenProps)) {
      // fetch user information from database
      const userFromDatabase = await models.User.findByPk(token.id);
      if (userFromDatabase) {
        // user has been found from database
        if (userFromDatabase?.getDataValue('disabled')) {
          // ...but it's disabled!
          await models.Session.destroy({ where: { userId: token.id } });
          throw new ControllerError(403, 'account disabled');
        } else {
          // token decoded, user is in database and is not disabled
          req.decodedToken = token;
          // let's add also permissions of chosen group
          const permissions = await getPermissionsOfGroup(token.activeGroup);
          req.permissions = permissions;
          // we are ready, let's move on
          next();
        }
      } else {
        // user was not found from database or result didn't validate as UserAttributes
        throw new ControllerError(403, 'user not found from database');
      }
    } else {
      next(new ControllerError(403, 'Malformed token'));
    }
  } catch (error) {
    if (error instanceof ControllerError) {
      next(error);
    }
    next(new ControllerError(403, 'Malformed token'));
  }
};

