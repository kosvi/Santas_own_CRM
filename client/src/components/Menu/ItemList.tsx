import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store';
import usePermission from '../../hooks/usePermission';
import { MenuItem } from '../../types';
import { Item } from './Item';

interface closeMethod {
  (): void
}

export const ItemList = ({ items, closeMenuMethod }: { items: Array<MenuItem>, closeMenuMethod: closeMethod }) => {

  const { user } = useSelector(authSelector);
  const { allowReadAccess } = usePermission();

  const displayLink = (item: MenuItem): boolean => {
    if (!item.permission) {
      return true;
    }
    if (item.permission && allowReadAccess(item.permission)) {
      return true;
    }
    return false;
  };

  const home: MenuItem = {
    title: user ? user.name : 'Home',
    to: '/'
  };

  return (
    <div data-testid="MenuItemsList">
      <Item item={home} closeMenuMethod={closeMenuMethod} />
      <div>&nbsp;</div>
      {items.map(i => {
        if (displayLink(i)) {
          return <Item key={i.title} item={i} closeMenuMethod={closeMenuMethod} />;
        }
        return;
      })
      }
    </div>
  );
};
