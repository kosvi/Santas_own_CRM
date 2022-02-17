import { PersonAttributes } from '../../types';
import { validateToDate, validateToString } from '../validators';

type NewPersonFields = { name: unknown, birthday: unknown, address: unknown };
export const toNewPerson = ({ name, birthday, address }: NewPersonFields): PersonAttributes => {
  return {
    name: validateToString(name),
    birthdate: validateToDate(birthday),
    address: validateToString(address)
  };
};