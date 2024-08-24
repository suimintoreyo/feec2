// app/components/Header.tsx
import React from "react";
import SideMenu from "./SideMenu";
import SideMenuButton from "./SideMenuButton";

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  return (
    <div className="pageheader">
      <SideMenuButton toggleMenu={toggleMenu} direction="right" />
      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}
