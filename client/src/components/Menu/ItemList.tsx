import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store';
import { MenuItem, PermissionCode, Permissions } from '../../types';
import { Item } from './Item';

export const ItemList = ({ items }: { items: Array<MenuItem> }) => {

  const { user } = useSelector(authSelector);

  const getPermission = (functionality: string, permissions: Permissions): boolean => {
  };

  return (
    <div>
      {items.map(i => {
        if(i.permission && user) {
	  console.log(user.permissions);
          return <Item key={i.title} item={i} />;
        }
        return;
      })
      }
    </div>
  );
};
