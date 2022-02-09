import { Permission, Permissions } from '../../types';

export const apiPermissionsToAuthPermissions = (apiPermissions: Array<Permission>): Permissions => {
  const defaultPermission = { read: false, write: false };
  const authPermissions: Permissions = {
    users: defaultPermission,
    people: defaultPermission,
    permissions: defaultPermission,
    wishes_and_items: defaultPermission,
    entries: defaultPermission
  };
  return authPermissions;
};
