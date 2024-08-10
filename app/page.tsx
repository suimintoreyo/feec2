// app/page.tsx
"use client";

import React, { useState } from "react";
import SideMenu from "./components/SideMenu";
import SideMenuButton from "../public/Side-menu-button.svg"

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <button onClick={toggleMenu}>
        <SideMenuButton width={24}></SideMenuButton>
      </button>
      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main
        style={{
          marginLeft: isMenuOpen ? "0px" : "0",
          transition: "margin-left 0.3s",
        }}
      >
        <h1>Welcome to the Home Page</h1>
        <p>This is your content</p>
      </main>
    </div>
  );
}
