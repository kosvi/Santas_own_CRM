import { validateToNumber, validateToString } from '../../../src/utils/validators';

export interface LoginResult {
  id: number,
  name: string,
  username: string,
  activeGroup: number,
  token: string,
  loginTime: number
}

/*
 *  Accidentally had this code written twice, so two equal functions for legacy reasons. 
 *  Going to remove another one of them once I decide which name will stay
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toLoginResult = (data: any): LoginResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toLoginResultFromAny(data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiLogin = (data: any): LoginResult => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toLoginResultFromAny(data);
};

type LoginResultFields = { id: unknown, name: unknown, username: unknown, activeGroup: unknown, token: unknown, loginTime: unknown };
const toLoginResultFromAny = ({ id, name, username, activeGroup, token, loginTime }: LoginResultFields): LoginResult => {
  return {
    id: validateToNumber(id),
    name: validateToString(name),
    username: validateToString(username),
    activeGroup: validateToNumber(activeGroup),
    token: validateToString(token),
    loginTime: validateToNumber(loginTime)
  };
};
