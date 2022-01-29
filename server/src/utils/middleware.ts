import express from 'express';
import { ControllerError } from './customError';
import { logger } from './logger';

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
