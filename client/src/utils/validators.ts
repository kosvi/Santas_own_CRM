export const isString = (text: unknown): text is string => {
  if (typeof text === 'string') {
    return true;
  }
  return false;
};

export const isNumber = (num: unknown): num is number => {
  if (typeof num === 'number') {
    return true;
  }
  return false;
};

export const isBoolean = (bool: unknown): bool is boolean => {
  if (typeof bool === 'boolean') {
    return true;
  }
  return false;
};

export const parseString = (text: unknown): string => {
  if (!text) {
    return '';
  }
  if (typeof text === 'string' || text instanceof String) {
    if (text instanceof String) {
      return text.toString();
    }
    return text;
  }
  if (isNumber(text)) {
    return Number(text).toString();
  }
  if (isBoolean(text)) {
    return Boolean(text).toString();
  }
  throw new Error('could not parse value to string');
};

export const parseDate = (date: unknown): Date | undefined => {
  if (date instanceof Date) {
    return date;
  }
  if (isNumber(date)) {
    return new Date(date);
  }
  if (isString(date) && Date.parse(date)) {
    return new Date(date);
  }
  return undefined;
};
