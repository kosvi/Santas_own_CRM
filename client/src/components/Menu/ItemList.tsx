import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store';
import { MenuItem, PermissionCode, Permissions } from '../../types';
import { Item } from './Item';

export const ItemList = ({ items }: { items: Array<MenuItem> }) => {

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

  return (
    <div>
      {items.map(i => {
        if (i.permission && user && getPermission(i.permission, user.permissions)) {
          return <Item key={i.title} item={i} />;
        }
        return;
      })
      }
    </div>
  );
};
