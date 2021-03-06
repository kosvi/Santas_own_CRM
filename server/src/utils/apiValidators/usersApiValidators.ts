import { UserAttributes } from '../../types';
import { hashPassword } from '../hashPasswords';
import { validateToString } from '../validators';

type NewUserFields = { username: unknown, password: unknown, name: unknown };
export const toNewUser = ({ username, password, name }: NewUserFields): UserAttributes => {
  return {
    username: validateToString(username),
    password: hashPassword(validateToString(password)),
    name: validateToString(name),
    disabled: false
  };
};

type NewPasswordFields = { password: unknown };
export const toNewPassword = ({ password }: NewPasswordFields): { password: string } => {
  return {
    password: hashPassword(validateToString(password))
  };
};