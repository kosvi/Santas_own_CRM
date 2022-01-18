/* 
 * Since this project uses TypeScript, we need to have a way to verify the type of variables. 
 * This file contains all sorts of validators that can be used to validate 'unknown' types to specific types. 
 */

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