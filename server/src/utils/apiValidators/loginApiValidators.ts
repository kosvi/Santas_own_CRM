import { validateToString } from '../validators';

export interface LoginObject {
  username: string,
  password: string
}

type LoginFields = { username: unknown, password: unknown };
export const toNewLoginObject = ({ username, password }: LoginFields): LoginObject => {
  return {
    username: validateToString(username),
    password: validateToString(password)
  };
};