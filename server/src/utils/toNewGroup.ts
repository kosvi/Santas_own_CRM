import { GroupAttributes } from '../types';
import { validateToString } from './validators';

type Fields = { name: unknown };

export const toNewGroup = ({ name }: Fields): GroupAttributes => {
  try {
    return {
      name: validateToString(name)
    };
  } catch (error) {
    throw new Error('malformed or missing name');
  }
};
