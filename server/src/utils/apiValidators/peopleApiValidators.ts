import { PersonAttributes } from '../../types';
import { validateToDate, validateToString } from '../validators';

type NewPersonFields = { name: unknown, birthdate: unknown, address: unknown };
export const toNewPerson = ({ name, birthdate, address }: NewPersonFields): PersonAttributes => {
  return {
    name: validateToString(name),
    birthdate: validateToDate(birthdate),
    address: validateToString(address)
  };
};
