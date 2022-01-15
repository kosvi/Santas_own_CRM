/* 
 * Since this project uses TypeScript, we need to have a way to verify the type of variables. 
 * This file contains all sorts of validators that can be used to validate 'unknown' types to specific types. 
 */

export const validateToString = (text: unknown): string => {
  if (!text || !(typeof text === 'string' || text instanceof String)) {
    throw new Error('Malformed string');
  } else {
    if (text instanceof String) {
      return text.toString();
    }
    return text;
  }
};
