// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import SideMenu from "./components/SideMenu";
import SideMenuButton from "../public/Side-menu-button.svg";
import { initializeKeyListener } from "./keyPressLogic";

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev); // 前の状態を反転させる
  }

  useEffect(() => {
    const removeListener = initializeKeyListener(toggleMenu); // Alt + M キーリスナーを初期化
    return () => removeListener(); // コンポーネントのアンマウント時にリスナーを削除
  }, []);

  return (
    <div>
      <div className="pageheader">
        <button onClick={toggleMenu}>
          <SideMenuButton width={24} />
        </button>
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
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
