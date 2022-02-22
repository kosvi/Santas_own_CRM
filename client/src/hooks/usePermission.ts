import { useSelector } from 'react-redux';
import { authSelector } from '../store';
import { PermissionCode } from '../types';

function usePermission() {

  const { user } = useSelector(authSelector);

  const allowReadAccess = (functionality: PermissionCode): boolean => {
    if (!user) {
      return false;
    }
    switch (functionality) {
    case 'people':
      return user.permissions.people.read;
    case 'permissions':
      return user.permissions.permissions.read;
    case 'entries':
      return user.permissions.entries.read;
    case 'users':
      return user.permissions.users.read;
    case 'wishes_and_items':
      return user.permissions.wishes_and_items.read;
    default:
      return false;
    }
  };

  const allowWriteAccess = (functionality: PermissionCode): boolean => {
    if (!user) {
      return false;
    }
    switch (functionality) {
    case 'people':
      return user.permissions.people.write;
    case 'permissions':
      return user.permissions.permissions.write;
    case 'entries':
      return user.permissions.entries.write;
    case 'users':
      return user.permissions.users.write;
    case 'wishes_and_items':
      return user.permissions.wishes_and_items.write;
    default:
      return false;
    }
  };

  return {
    allowReadAccess, allowWriteAccess
  };
}

export default usePermission;
