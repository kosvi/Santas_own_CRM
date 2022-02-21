import { validateToNumber, validateToString } from '../../../src/utils/validators';

export interface ApiWish {
  id: number,
  personId: number,
  itemId: number,
  description: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiWish = (data: any): ApiWish => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiWishFromAny(data);
};

type WishFields = { id: unknown, personId: unknown, itemId: unknown, description: unknown };
const toApiWishFromAny = ({ id, personId, itemId, description }: WishFields): ApiWish => {
  const wish = {
    id: validateToNumber(id),
    personId: validateToNumber(personId),
    itemId: validateToNumber(itemId),
    description: validateToString(description)
  };
  return wish;
};
