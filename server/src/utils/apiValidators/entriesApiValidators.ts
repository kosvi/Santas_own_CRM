import { NewEntry } from '../../types';
import { validateToNumber, validateToString } from '../validators';

type NewEntryFields = { personId: unknown, userId: unknown, niceness: unknown, description: unknown };
export const toNewEntry = ({ personId, userId, niceness, description }: NewEntryFields): NewEntry => {
  return {
    personId: validateToNumber(personId),
    userId: validateToNumber(userId),
    niceness: validateToNumber(niceness),
    description: validateToString(description)
  };
};