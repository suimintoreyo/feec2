// app/components/Header.tsx
import React from "react";
import SideMenuButton from "../../public/Side-menu-button.svg";
import SideMenu from "./SideMenu";

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  return (
    <div className="pageheader">
      <button onClick={toggleMenu}>
        <SideMenuButton width={24} />
      </button>
      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}
