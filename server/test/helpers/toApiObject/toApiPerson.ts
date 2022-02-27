import { validateToNumber, validateToString, validateToDate } from '../../../src/utils/validators';

interface Wish {
  id: number,
  description: string,
  item: {
    id: number,
    name: string
  }
}

interface Entry {
  id: number,
  userId: number,
  niceness: number,
  description: string,
  createdAt: Date,
  updatedAt: Date
}

export interface ApiPerson {
  id: number,
  name: string,
  birthdate: Date,
  address: string,
  createdAt: Date,
  updatedAt: Date,
  wishes?: Array<Wish>,
  entries?: Array<Entry>
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

type EntryFields = { id: unknown, userId: unknown, niceness: unknown, description: unknown, createdAt: unknown, updatedAt: unknown };
const toPersonEntry = ({ id, userId, niceness, description, createdAt, updatedAt }: EntryFields): Entry => {
  const entry = {
    id: validateToNumber(id),
    userId: validateToNumber(userId),
    niceness: validateToNumber(niceness),
    description: validateToString(description),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt)
  };
  return entry;
};

type ItemFields = { id: unknown, name: unknown };
const toWishItem = ({ id, name }: ItemFields): { id: number, name: string } => {
  const item = {
    id: validateToNumber(id),
    name: validateToString(name)
  };
  return item;
};

type PersonFields = { id: unknown, name: unknown, birthdate: unknown, address: unknown, createdAt: unknown, updatedAt: unknown, wishes: unknown, entries: unknown };
const toApiPersonFromAny = ({ id, name, birthdate, address, createdAt, updatedAt, wishes, entries }: PersonFields): ApiPerson => {
  const person = {
    id: validateToNumber(id),
    name: validateToString(name),
    birthdate: validateToDate(birthdate),
    address: validateToString(address),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt)
  };
  if (wishes || entries) {
    if (wishes instanceof Array && entries instanceof Array) {
      const wishArray = wishes.map(w => {
        return toPersonWish(w as Wish);
      });
      const entryArray = entries.map(e => {
        return toPersonEntry(e as Entry);
      });
      return {
        ...person,
        wishes: wishArray,
        entries: entryArray
      };
    } else {
      throw new Error('wishes or entries not given as Array');
    }
  }
  return person;
};
