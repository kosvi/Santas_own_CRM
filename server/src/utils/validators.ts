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
