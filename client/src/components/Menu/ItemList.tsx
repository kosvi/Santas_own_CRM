import React from 'react';
import { MenuItem } from '../../types';
import { Item } from './Item';

export const ItemList = ({ items }: { items: Array<MenuItem> }) => {
  return (
    <div>
      {items.map(i => <Item key={i.title} item={i} />)}
    </div>
  );
};
