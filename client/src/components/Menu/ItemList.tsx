import React from 'react';
import usePermission from '../../hooks/usePermission';
import { MenuItem } from '../../types';
import { Item } from './Item';

interface closeMethod {
  (): void
}

export const ItemList = ({ items, closeMenuMethod }: { items: Array<MenuItem>, closeMenuMethod: closeMethod }) => {

  const [allowReadAccess] = usePermission();

  const displayLink = (item: MenuItem): boolean => {
    if (!item.permission) {
      return true;
    }
    if (item.permission && allowReadAccess(item.permission)) {
      return true;
    }
    return false;
  };

  return (
    <div>
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
