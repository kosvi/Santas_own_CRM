import express from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from './config';
import { ControllerError } from './customError';
import { logger } from './logger';
import { validateToString, validateToObject } from './validators';
import { AccessTokenContent, RequestWithToken } from '../types';
import models from '../models';

export const errorHandler = (error: ControllerError | Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error handled by middleware: ${error.name}`);
  if (error instanceof ControllerError) {
    res.status(error.statusCode).json({ error: error.message });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(403).json({ error: `${error.message}: ${error.name}` });
  }
  if (error.name === 'SequelizeValidationError') {
    res.status(400).json({ error: `${error.message}: ${error.name}` });
  }
  if (error.name === 'SequelizeDatabaseError') {
    res.status(500).json({ error: `${error.message}: ${error.name}` });
  }
  next(error);
};

export const authenticate = (req: RequestWithToken, _res: express.Response, next: express.NextFunction) => {
  const auth = req.get('authorization');
  if (auth || validateToString(auth).toLowerCase().startsWith('bearer ')) {
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
        models.User.findByPk(token.id)
          .then(userFromDatabase => {
            if (userFromDatabase) {
              // user has been found from database
              if (userFromDatabase?.getDataValue('disabled')) {
                // ...but it's disabled!
                models.Session.destroy({ where: { userId: token.id } })
                  .then(() => {
                    throw new ControllerError(403, 'account disabled');
                  })
                  .catch(error => {
                    next(error);
                  });
              } else {
                // token decoded, user is in database and is not disabled
                req.decodedToken = token;
              }
            } else {
              // user was not found from database or result didn't validate as UserAttributes
              throw new ControllerError(403, 'user not found from database');
            }
          })
          .catch(error => {
            logger.logError(error);
            if (error instanceof ControllerError) {
              next(error);
            }
            next(new ControllerError(500, 'access to database failed'));
          });
      }
    } catch (error) {
      if (error instanceof ControllerError) {
        throw error;
      }
      throw new ControllerError(403, 'Malformed token');
    }
  }
  next();
};

/*
THIS REALLY NEEDS FIXING!!!

const getPermissionsOfGroup = async (id: number) => {
  const permissions = await models.Permission.findAll({
    where: { groupId: id },
    include: {
      model: models.Functionality
    }
  });
  const cleanPermissionArray = permissions.map(p => {
    if (validateToObject<PermissionWithFunctionality>(p, ['functionality', 'read', 'write'])) {
      return { code: p.functionality.code, read: p.read, write: p.write };
    }
  });
  return cleanPermissionArray;
};
*/