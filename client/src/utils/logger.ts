import { LOGGING } from './config';

const log = (text: string) => {
  if (LOGGING)
    console.log(text);
};

const error = (text: string) => {
  if (LOGGING)
    console.error(text);
};

const logError = (obj: unknown) => {
  if (obj instanceof Error && LOGGING) {
    console.log(obj.name, obj.message);
  }
};

export const logger = {
  log, error, logError
};
