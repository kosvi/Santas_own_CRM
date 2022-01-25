import { validateToNumber, validateToString } from '../../../src/utils/validators';

export interface ApiItem {
  count: number,
  item: {
    id: number,
    name: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiItem = (data: any): ApiItem => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiItemFromAny(data);
};

type ItemItemFields = { id: unknown, name: unknown };
const toItemItem = ({ id, name }: ItemItemFields): { id: number, name: string } => {
  return {
    id: validateToNumber(id),
    name: validateToString(name)
  };
};

type ItemFields = { count: unknown, item: ItemItemFields };
const toApiItemFromAny = ({ count, item }: ItemFields): ApiItem => {
  return {
    count: validateToNumber(parseInt(validateToString(count))),
    item: toItemItem(item)
  };
};
