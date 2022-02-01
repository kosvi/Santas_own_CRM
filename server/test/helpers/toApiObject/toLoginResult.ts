import { validateToNumber, validateToString } from '../../../src/utils/validators';

export interface LoginResult {
  id: number,
  name: string,
  username: string,
  activeGroup: number,
  token: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toLoginResult = (data: any): LoginResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toLoginResultFromAny(data);
};

type LoginResultFields = { id: unknown, name: unknown, username: unknown, activeGroup: unknown, token: unknown };
const toLoginResultFromAny = ({ id, name, username, activeGroup, token }: LoginResultFields): LoginResult => {
  return {
    id: validateToNumber(id),
    name: validateToString(name),
    username: validateToString(username),
    activeGroup: validateToNumber(activeGroup),
    token: validateToString(token)
  };
};
