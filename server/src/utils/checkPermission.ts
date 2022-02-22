import { PermissionWithCode } from '../types';
import { ControllerError } from './customError';

type PermissionType = 'users' | 'permissions' | 'people' | 'wishes_and_items' | 'entries';

export const checkReadPermission = (functionality: PermissionType, permissions: Array<PermissionWithCode> | undefined): boolean => {
  const permission = findPermission(functionality, permissions);
  if (!permission.read) {
    throw new ControllerError(403, 'no permission to access this data');
  } else {
    return true;
  }
};

export const checkWritePermission = (functionality: PermissionType, permissions: Array<PermissionWithCode> | undefined): boolean => {
  const permission = findPermission(functionality, permissions);
  if (!permission.write) {
    throw new ControllerError(403, 'no permission to access this data');
  } else {
    return true;
  }
};

const findPermission = (functionality: PermissionType, permissions: Array<PermissionWithCode> | undefined): { read: boolean, write: boolean } => {
  if (!permissions) {
    throw new ControllerError(403, 'no permissions set');
  }
  const permission = permissions.find(p => p.code === functionality);
  if (permission) {
    return {
      read: permission.read,
      write: permission.write
    };
  }
  // if no permission is set to this 'functionality', just tell it to user
  throw new ControllerError(403, 'no permissions set');
};
