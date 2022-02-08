import React from 'react';
import { MenuItem } from '../../types';

export const Item = ({ item }: {item: MenuItem}) => {
  return (
    <div>
      {item.title}
    </div>
  );
};
