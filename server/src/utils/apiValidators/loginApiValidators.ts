import { UserWithGroupsInLogin } from '../../types';
import { validateToBoolean, validateToNumber, validateToString } from '../validators';

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

type UserWithGroupsFields = { id: unknown, username: unknown, password: unknown, name: unknown, disabled: unknown, groups: unknown };
export const toUserWithGroupsInLogin = ({ id, username, password, name, disabled, groups }: UserWithGroupsFields): UserWithGroupsInLogin => {
  return {
    id: validateToNumber(id),
    username: validateToString(username),
    password: validateToString(password),
    name: validateToString(name),
    disabled: validateToBoolean(disabled),
    groups: toGroupsInUser(groups)
  };
};

type GroupFields = { id: unknown, name: unknown };
export const toGroupInUser = ({ id, name }: GroupFields): { id: number, name: string } => {
  return {
    id: validateToNumber(id),
    name: validateToString(name)
  };
};

export const toGroupsInUser = (groups: unknown): Array<{ id: number, name: string }> | [] => {
  if (!(groups instanceof Array)) {
    return [];
  } else {
    const groupsAsArray = groups.map(g => toGroupInUser(g as GroupFields));
    return groupsAsArray;
  }
};