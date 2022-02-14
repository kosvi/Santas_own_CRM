import React, { useState } from 'react';
import { ItemList } from './ItemList';
import { listOfItems } from './listOfItems';

export const Menu = () => {

  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  const closeMenu = () => {
    setDisplayMenu(false);
  };

  return (
    <div id="Menu">
      <div id="MenuItems">
        {displayMenu && <ItemList items={listOfItems} closeMenuMethod={closeMenu} />}
      </div>
      <div id="MenuButton" onClick={toggleMenu}>Menu</div>
    </div>
  );
};
