import React from 'react';
import { menu, getMenu } from './data';
import MenuItem from './MenuItem';
import { useTranslation } from '../../hooks/useTranslation';

const Menu = () => {
  const { t } = useTranslation();
  const role = localStorage.getItem('role') || 'farmer'; // Get the user's role from localStorage with a default
  
  // Use the translated menu
  const translatedMenu = getMenu();

  // Filter menu items based on the user's role
  const filteredMenu = translatedMenu.map((item) => ({
    ...item,
    listItems: item.listItems.filter((listItem) => listItem.role === role),
  }));

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5 ">
        {filteredMenu.map((item, index) => (
          <MenuItem
            key={index}
            catalog={item.catalog}
            listItems={item.listItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;