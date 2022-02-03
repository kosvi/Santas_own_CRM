/* 
 * Since this project uses TypeScript, we need to have a way to verify the type of variables. 
 * This file contains all sorts of validators that can be used to validate 'unknown' types to specific types. 
 */

// import { AccessTokenContent } from '../types';

export const validateToString = (text: unknown): string => {
  if (text === '') {
    return '';
  }
  if (!text || !(typeof text === 'string' || text instanceof String)) {
    throw new Error('Malformed string');
  } else {
    if (text instanceof String) {
      return text.toString();
    }
    return text;
  }
};

export const validateToNumber = (num: unknown): number => {
  if (num === 0) {
    return 0;
  }
  if (!num || !(typeof num === 'number' || num instanceof Number)) {
    throw new Error('Incorrect or missing number');
  } else {
    if (num instanceof Number) {
      return num.valueOf();
    }
    return num;
  }
};

export const validateToDate = (date: unknown): Date => {
  try {
    const dateString: string = validateToString(date);
    if (Date.parse(dateString)) {
      return new Date(dateString);
    }
    throw new Error(`Incorrect date: ${date}`);
  } catch (error) {
    throw new Error(`Incorrect date: ${date}`);
  }
};

export const validateToBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean' || value instanceof Boolean) {
    if (value instanceof Boolean) {
      return value.valueOf();
    }
    return value;
  }
  throw new Error('Value is not boolean');
};

export function validateToObject<T>(obj: unknown, props: Array<string | number | symbol>): obj is T {
  if(!(obj instanceof Object)) {
    return false;
  }
  for(let i=0;i<props.length;i++) {
    if(!Object.prototype.hasOwnProperty.call(obj, props[i])) {
      return false;
    }
  }
  return true;
}
