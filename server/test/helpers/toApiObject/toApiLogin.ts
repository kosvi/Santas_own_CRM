import { validateToBoolean, validateToNumber, validateToString } from '../../../src/utils/validators';

export interface LoginResult {
  id: number,
  name: string,
  username: string,
  activeGroup: number,
  token: string,
  loginTime: number,
  permissions: Array<{
    code: string,
    read: boolean,
    write: boolean
  }>,
  groups: Array<{
    id: number,
    name: string
  }>
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

type LoginPermission = { code: unknown, read: unknown, write: unknown };
const toLoginPermissions = (permissions: Array<LoginPermission>): Array<{ code: string, read: boolean, write: boolean }> => {
  if (!(permissions instanceof Array)) {
    throw new Error('Not an array!');
  }
  return permissions.map(p => {
    return {
      code: validateToString(p.code),
      read: validateToBoolean(p.read),
      write: validateToBoolean(p.write)
    };
  });
};

type LoginGroup = { id: unknown, name: unknown };
const toLoginGroups = (groups: Array<LoginGroup>): Array<{ id: number, name: string }> => {
  if (!(groups instanceof Array)) {
    throw new Error('Not an array!');
  }
  return groups.map(g => {
    return {
      id: validateToNumber(g.id),
      name: validateToString(g.name)
    };
  });
};

type LoginResultFields = { id: unknown, name: unknown, username: unknown, activeGroup: unknown, token: unknown, loginTime: unknown, permissions: unknown, groups: unknown };
const toLoginResultFromAny = ({ id, name, username, activeGroup, token, loginTime, permissions, groups }: LoginResultFields): LoginResult => {
  return {
    id: validateToNumber(id),
    name: validateToString(name),
    username: validateToString(username),
    activeGroup: validateToNumber(activeGroup),
    token: validateToString(token),
    loginTime: validateToNumber(loginTime),
    permissions: toLoginPermissions(permissions as Array<LoginPermission>),
    groups: toLoginGroups(groups as Array<LoginGroup>)
  };
};
