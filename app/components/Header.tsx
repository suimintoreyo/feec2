import React from "react";
import SideMenu from "./SideMenu/SideMenu";
import SideMenuButton from "./SideMenu/SideMenuButton";
import { MenuItem } from "./types";  // 型定義をインポート

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onMenuItemClick: (item: MenuItem) => void;  // 型を MenuItem に変更
}

export default function Header({ isMenuOpen, toggleMenu, onMenuItemClick }: HeaderProps) {
  return (
    <div className="pageheader">
      <SideMenuButton toggleMenu={toggleMenu} direction="right" />
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onMenuItemClick={onMenuItemClick}  // onMenuItemClick を渡す
      />
    </div>
  );
}
