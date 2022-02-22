import { NewWish } from '../../types';
import { validateToNumber, validateToString } from '../validators';

type NewWishFields = { personId: unknown, itemName: unknown, description: unknown };
export const toNewWish = ({ personId, itemName, description }: NewWishFields): NewWish => {
  const newWish: NewWish = {
    personId: validateToNumber(personId),
    itemName: validateToString(itemName),
    description: validateToString(description)
  };
  return newWish;
};