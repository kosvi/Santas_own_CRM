import { validateToNumber, validateToString, validateToDate } from '../../../src/utils/validators';

export interface ApiPerson {
  id: number,
  name: string,
  birthdate: Date,
  address: string,
  createdAt: Date,
  updatedAt: Date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiPerson = (data: any): ApiPerson => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiPersonFromAny(data);
};

type PersonFields = { id: unknown, name: unknown, birthdate: unknown, address: unknown, createdAt: unknown, updatedAt: unknown };
const toApiPersonFromAny = ({ id, name, birthdate, address, createdAt, updatedAt }: PersonFields): ApiPerson => {
  const person = {
    id: validateToNumber(id),
    name: validateToString(name),
    birthdate: validateToDate(birthdate),
    address: validateToString(address),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt)
  };
  return person;
};
