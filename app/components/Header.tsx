import React from "react";
import SideMenu from "./SideMenu/SideMenu";
import SideMenuButton from "./SideMenu/SideMenuButton";

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onMenuItemClick: (item: string) => void; // onMenuItemClick の追加
}

export default function Header({ isMenuOpen, toggleMenu, onMenuItemClick }: HeaderProps) {
  return (
    <div className="pageheader">
      <SideMenuButton toggleMenu={toggleMenu} direction="right" />
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onMenuItemClick={onMenuItemClick} // onMenuItemClick を渡す
      />
    </div>
  );
}
