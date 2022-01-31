import express from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from './config';
import { ControllerError } from './customError';
import { logger } from './logger';
import { validateToString, validateToObject } from './validators';
import { AccessTokenContent } from '../types';

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

export const authenticate = async (req: express.Request, _res: express.Response, _next: express.NextFunction) => {
  const auth = req.get('authorization');
  if (auth || validateToString(auth).toLowerCase().startsWith('bearer ')) {
    try {
      if(!SECRET) {
        throw new ControllerError(500, 'Can\'t verify tokens');
      }
      const token = verify(validateToString(auth).substring(7), SECRET);
      if(validateToObject<AccessTokenContent>(token)) {
        console.log(token.name);
      }
    } catch (error) {
      if(error instanceof ControllerError) {
	throw error;
      }
      throw new ControllerError(403, 'Malformed token');
    }
  }
};
