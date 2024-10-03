"use client"; // 追加: クライアントコンポーネントとしてマーク

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import GameManager from './components/GameManager/GameManager';
import GameEdit from './components/GameEdit/GameEdit';
import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./Page.module.css";
//import RegistrForm from './components/RegistrForm';
import RegistrForm from './components/LoginForm';


export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<string>("TypingGame");
  const toggleMenu = () => setMenuOpen((prev) => !prev);



  function handleMenuItemClick(item: string) {
    if (item === "Menu Item 1") {
      setCurrentScreen("GameManager");
      setMenuOpen(false);
      setExpanded(false);
    } else if (item === "Menu Item 2") {
      setCurrentScreen("GameEdit");
      setMenuOpen(false);
      setExpanded(false);
    } else if (item === "Menu Item 3") {
      setExpanded((prev) => !prev);
    }
  }

  useEffect(() => {
    const removeListener = initializeKeyListener(toggleMenu);
    return () => removeListener();
  }, []);

  function renderScreen() {
    switch (currentScreen) {
      case "TypingGame":
        return <TypingGame />;
      case "GameManager":
        return <GameManager />;
      case "GameEdit":
        return <GameEdit />;
      default:
        return null;
    }
  }

  return (
    <div>
      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onMenuItemClick={handleMenuItemClick}
      />
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onMenuItemClick={handleMenuItemClick}
        isExpanded={isExpanded}
        setExpanded={setExpanded} // 追加: setExpanded を渡す
      />
      <main
        style={{
          marginLeft: isMenuOpen ? (isExpanded ? "300px" : "250px") : "0",
          transition: "margin-left 0.3s",
        }}
      >
        <div className={styles.pageContents}>
          {renderScreen()}
        </div>
      </main>
    </div>

  );
}