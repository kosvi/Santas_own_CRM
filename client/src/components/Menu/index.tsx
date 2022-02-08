import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { ItemList } from './ItemList';

export const Menu = () => {

  const listOfItems: Array<MenuItem> = [
    {
      title: 'foobar',
      url: 'foobar'
    },
    {
      title: 'another link',
      url: 'another url'
    }
  ];

  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  return (
    <div>
      {displayMenu && <ItemList items={listOfItems} />}
      <div onClick={toggleMenu}>Menu</div>
    </div>
  );
};
