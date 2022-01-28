import { validateToNumber, validateToString, validateToDate } from '../../../src/utils/validators';

export interface ApiEntry {
  id: number,
  userId: number,
  personId: number,
  niceness: number,
  description: string,
  createdAt: Date,
  updatedAt: Date,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiEntry = (data: any): ApiEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiEntryFromAny(data);
};

type EntryFields = { id: unknown, userId: unknown, personId: unknown, niceness: unknown, description: unknown, createdAt: unknown, updatedAt: unknown };
const toApiEntryFromAny = ({ id, userId, personId, niceness, description, createdAt, updatedAt }: EntryFields): ApiEntry => {
  const entry = {
    id: validateToNumber(id),
    userId: validateToNumber(userId),
    personId: validateToNumber(personId),
    niceness: validateToNumber(niceness),
    description: validateToString(description),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt)
  };
  return entry;
};