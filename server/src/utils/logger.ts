/* eslint-disable no-console */
import { NODE_ENV } from './config';

const log = (line: string) => {
  if (NODE_ENV === 'develop') {
    console.log(line);
  }
};

const error = (line: string) => {
  if (NODE_ENV === 'develop') {
    console.log(line);
  }
};

const logError = (error: unknown) => {
  if (error instanceof Error) {
    log(error.message);
  } else if (NODE_ENV === 'develop') {
    console.error(error);
  }
};

export const logger = {
  log, error, logError
};