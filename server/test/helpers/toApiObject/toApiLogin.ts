import { validateToString, validateToNumber } from '../../../src/utils/validators';

interface LoginObject {
  username: string,
  name: string,
  token: string,
  id: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiLogin = (data: any): LoginObject => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiLoginFromAny(data);
};

type LoginFields = { username: unknown, name: unknown, token: unknown, id: unknown };
const toApiLoginFromAny = ({ username, name, token, id }: LoginFields): LoginObject => {
  return {
    username: validateToString(username),
    name: validateToString(name),
    token: validateToString(token),
    id: validateToNumber(id)
  };
};