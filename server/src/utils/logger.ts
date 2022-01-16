import { NODE_ENV } from './config';

const log = (line: string) => {
  if (NODE_ENV !== 'production') {
    console.log(line);
  }
};

const error = (line: string) => {
  if (NODE_ENV !== 'production') {
    console.log(line);
  }
};

export const logger = {
  log, error
};