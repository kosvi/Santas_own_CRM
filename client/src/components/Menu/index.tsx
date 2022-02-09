import React, { useState } from 'react';
import { ItemList } from './ItemList';
import { listOfItems } from './listOfItems';

export const Menu = () => {

  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  return (
    <div id="Menu">
      {displayMenu && <ItemList items={listOfItems} />}
      <div id="MenuButton" onClick={toggleMenu}>Menu</div>
    </div>
  );
};
