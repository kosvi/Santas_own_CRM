import express from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from './config';
import { ControllerError } from './customError';
import { logger } from './logger';
import { toPermissionsWithFunctionality } from './apiValidators';
import { validateToString, validateToObject } from './validators';
import { AccessTokenContent, PermissionsInRequest, RequestWithToken } from '../types';
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
  // ok, there is something, let's validate the token if set
  if (validateToString(auth).toLowerCase().startsWith('bearer ')) {
    try {
      if (!SECRET) {
        throw new ControllerError(500, 'Can\'t verify tokens');
      }
      const token = verify(validateToString(auth).substring(7), SECRET);
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
  }
  next();
};

const getPermissionsOfGroup = async (id: number): Promise<PermissionsInRequest[]> => {
  const permissionsFromDatabase = await models.Permission.findAll({
    where: { groupId: id },
    attributes: { exclude: ['id', 'groupId', 'functionalityId'] },
    include: {
      model: models.Functionality,
      attributes: { exclude: ['id', 'name'] }
    }
  });
  // This must be really nasty again
  if (permissionsFromDatabase instanceof Array && permissionsFromDatabase.length > 0) {
    const rawPermissions = toPermissionsWithFunctionality(permissionsFromDatabase);
    const permissions = rawPermissions.map(rp => {
      return { code: rp.functionality.code, read: rp.read, write: rp.write };
    });
    return permissions;
  }
  return [];
};

