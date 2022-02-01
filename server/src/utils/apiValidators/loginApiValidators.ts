import { UserWithGroupsInLogin, PermissionWithFunctionality } from '../../types';
import { validateToBoolean, validateToNumber, validateToString } from '../validators';

export interface LoginObject {
  username: string,
  password: string
}

/*
  This validates object that user sends when logging in
*/

type LoginFields = { username: unknown, password: unknown };
export const toNewLoginObject = ({ username, password }: LoginFields): LoginObject => {
  return {
    username: validateToString(username),
    password: validateToString(password)
  };
};

/*
  This validates data fetched from database, when we need information of users groups during logging in
*/

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

/*
  Here we validate permission array to store permissions for users request
*/

export const toPermissionsWithFunctionality = (data: unknown): Array<PermissionWithFunctionality> | [] => {
  if(data instanceof Array) {
    const permissionArray = data.map(perm => toPermissionWithFunctionalityObject(perm as PermissionFields));
    return permissionArray;
  }
  return [];
}

type PermissionFields = { read: unknown, write: unknown, functionality: unknown };
const toPermissionWithFunctionalityObject = ({read, write, functionality}:PermissionFields): PermissionWithFunctionality => {
  return {
    read: validateToBoolean(read),
    write: validateToBoolean(write),
    functionality: toFunctionalityInPermission(functionality as FunctionalityInPermissionFields)
  };
};

type FunctionalityInPermissionFields = {code: unknown};
const toFunctionalityInPermission = ({code}:FunctionalityInPermissionFields): {code: string} => {
  return {
    code: validateToString(code)
  };
};

type GroupFields = { id: unknown, name: unknown };
const toGroupInUser = ({ id, name }: GroupFields): { id: number, name: string } => {
  return {
    id: validateToNumber(id),
    name: validateToString(name)
  };
};

const toGroupsInUser = (groups: unknown): Array<{ id: number, name: string }> | [] => {
  if (!(groups instanceof Array)) {
    return [];
  } else {
    const groupsAsArray = groups.map(g => toGroupInUser(g as GroupFields));
    return groupsAsArray;
  }
};

