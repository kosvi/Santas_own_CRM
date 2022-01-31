import express from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from './config';
import { ControllerError } from './customError';
import { logger } from './logger';
import { validateToString, validateToObject } from './validators';
import { AccessTokenContent, RequestWithToken, UserAttributes } from '../types';
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

// export const authenticate = async (req: RequestWithToken, _res: express.Response, next: express.NextFunction) => {
export const authenticate = (req: RequestWithToken, _res: express.Response, next: express.NextFunction) => {
  const auth = req.get('authorization');
  if (auth || validateToString(auth).toLowerCase().startsWith('bearer ')) {
    try {
      if (!SECRET) {
        throw new ControllerError(500, 'Can\'t verify tokens');
      }
      const token = verify(validateToString(auth).substring(7), SECRET);
      // make sure we have all properties of AccessTokenContent in 'tokenProps' 
      const tokenProps: Array<keyof AccessTokenContent> = ['id', 'name', 'username'];
      // and then validate that token has all those properties
      if (validateToObject<AccessTokenContent>(token, tokenProps)) {
        // fetch users information from database
        const userFromDatabase = await models.User.findByPk(token.id);
        const userProps: Array<keyof UserAttributes> = ['id', 'name', 'password', 'username', 'disabled'];
        if (validateToObject<UserAttributes>(userFromDatabase, userProps)) {
          // user has been found from database and is validated
          if (userFromDatabase.disabled) {
            // ...but it's disabled!
            await models.Session.destroy({ where: { userId: token.id } });
            throw new ControllerError(403, 'account disabled');
          } else {
            // token decoded, user is in database and is not disabled
            req.decodedToken = token;
          }
        } else {
          // user was not found from database or result didn't validate as UserAttributes
          throw new ControllerError(403, 'user not found from database');
        }
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
