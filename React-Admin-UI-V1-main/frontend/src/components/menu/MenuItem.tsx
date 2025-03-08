import React from "react";
import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  onClick?: () => void;
  catalog: string;
  listItems: Array<{
    isLink: boolean;
    url?: string;
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
  }>;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, catalog, listItems }) => {
  return (
    <div className="w-full flex flex-col items-stretch gap-2 p-4 rounded-md">
      <span className="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase me-2 text-gray-500 dark:text-gray-400">
        {catalog}
      </span>
      {listItems.map((listItem, index) => {
        const commonClasses =
          "btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start flex items-center gap-3 transition-all duration-300 ease-in-out rounded-md overflow-hidden relative";
        const hoverClasses =
          "hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105";
        const activeClasses =
          "active:scale-95 active:ring-2 active:ring-gray-400 dark:active:ring-gray-600";
        const rippleEffect =
          "after:absolute after:inset-0 after:bg-gray-300 dark:after:bg-gray-600 after:opacity-0 after:transition-opacity after:duration-500 active:after:opacity-25";

        if (listItem.isLink) {
          return (
            <NavLink
              key={index}
              onClick={onClick}
              to={listItem.url || ""}
              className={({ isActive }) =>
                `${commonClasses} ${hoverClasses} ${activeClasses} ${rippleEffect} ${
                  isActive ? "bg-gray-300 dark:bg-gray-600" : ""
                }`
              }
            >
              <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-gray-700 dark:text-gray-300" />
              <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize text-gray-800 dark:text-gray-200">
                {listItem.label}
              </span>
            </NavLink>
          );
        } else {
          return (
            <button
              key={index}
              onClick={listItem.onClick}
              className={`${commonClasses} ${hoverClasses} ${activeClasses} ${rippleEffect}`}
            >
              <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-gray-700 dark:text-gray-300" />
              <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize text-gray-800 dark:text-gray-200">
                {listItem.label}
              </span>
            </button>
          );
        }
      })}
    </div>
  );
};

export default MenuItem;
