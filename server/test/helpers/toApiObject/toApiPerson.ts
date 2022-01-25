import { validateToNumber, validateToString, validateToDate } from '../../../src/utils/validators';

export interface Wish {
  id: number,
  description: string,
  item: {
    id: number,
    name: string
  }
}

export interface ApiPerson {
  id: number,
  name: string,
  birthdate: Date,
  address: string,
  createdAt: Date,
  updatedAt: Date,
  wishes?: Array<Wish>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiPerson = (data: any): ApiPerson => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiPersonFromAny(data);
};

type WishFields = { id: unknown, description: unknown, item: unknown };
const toPersonWish = ({ id, description, item }: WishFields): Wish => {
  const wish = {
    id: validateToNumber(id),
    description: validateToString(description),
    item: toWishItem(item as ItemFields)
  };
  return wish;
};

type ItemFields = { id: unknown, name: unknown };
const toWishItem = ({ id, name }: ItemFields): { id: number, name: string } => {
  const item = {
    id: validateToNumber(id),
    name: validateToString(name)
  };
  return item;
};

type PersonFields = { id: unknown, name: unknown, birthdate: unknown, address: unknown, createdAt: unknown, updatedAt: unknown, wishes: unknown };
const toApiPersonFromAny = ({ id, name, birthdate, address, createdAt, updatedAt, wishes }: PersonFields): ApiPerson => {
  const person = {
    id: validateToNumber(id),
    name: validateToString(name),
    birthdate: validateToDate(birthdate),
    address: validateToString(address),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt)
  };
  if(wishes) {
    if(wishes instanceof Array) {
      const wishArray = wishes.map(w => {
        return toPersonWish(w);
      });
      return {
        ...person,
        wishes: wishArray
      };
    } else {
      throw new Error('wishes not given as Array');
    }
  }
  return person;
};
