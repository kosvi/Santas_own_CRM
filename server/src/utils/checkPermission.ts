import { PermissionsInRequest } from '../types';

type PermissionType = 'users' | 'permissions' | 'people' | 'wishes_and_items' | 'entries';

export const checkPermission = (functionality: PermissionType, permissions: Array<PermissionsInRequest>): { read: boolean, write: boolean } => {
  const permission = permissions.find(p => p.code === functionality);
  if (permission) {
    return {
      read: permission.read,
      write: permission.write
    };
  }
  return {
    read: false,
    write: false
  };
};