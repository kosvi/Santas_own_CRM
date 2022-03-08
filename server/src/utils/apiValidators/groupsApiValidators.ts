import { GroupAttributes, PermissionAttributes } from '../../types';
import { validateToBoolean, validateToNumber, validateToString } from '../validators';

type GroupFields = { name: unknown };

export const toNewGroup = ({ name }: GroupFields): GroupAttributes => {
  try {
    return {
      name: validateToString(name)
    };
  } catch (error) {
    throw new Error('malformed or missing name');
  }
};

type PermissionFields = { groupId: unknown, functionalityId: unknown, read: unknown, write: unknown };

export const toNewPermission = ({ groupId, functionalityId, read, write }: PermissionFields): PermissionAttributes => {
  try {
    return {
      groupId: validateToNumber(groupId),
      functionalityId: validateToNumber(functionalityId),
      read: validateToBoolean(read),
      write: validateToBoolean(write)
    };
  } catch (error) {
    throw new Error('malformed permission');
  }
};

type UserGroupFields = { groupId: unknown, userId: unknown };

export const toNewUserGroup = ({ groupId, userId }: UserGroupFields): { groupId: number, userId: number } => {
  try {
    return {
      groupId: validateToNumber(groupId),
      userId: validateToNumber(userId)
    };
  } catch (error) {
    throw new Error('malformed content');
  }
};