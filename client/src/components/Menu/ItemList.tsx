import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store';
import { AuthUser, MenuItem, PermissionCode, Permissions } from '../../types';
import { Item } from './Item';

interface closeMethod {
  (): void
}

export const ItemList = ({ items, closeMenuMethod }: { items: Array<MenuItem>, closeMenuMethod: closeMethod }) => {

  const { user } = useSelector(authSelector);

  const getPermission = (functionality: PermissionCode, permissions: Permissions): boolean => {
    switch (functionality) {
    case 'people':
      return permissions.people.read;
    case 'permissions':
      return permissions.permissions.read;
    }
    return false;
  };

  const displayLink = (item: MenuItem, user: AuthUser | undefined): boolean => {
    if (!item.permission) {
      return true;
    }
    if (item.permission && user && getPermission(item.permission, user.permissions)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {items.map(i => {
        if (displayLink(i, user)) {
          return <Item key={i.title} item={i} closeMenuMethod={closeMenuMethod} />;
        }
        return;
      })
      }
    </div>
  );
};
