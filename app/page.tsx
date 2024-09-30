"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import GameManager from './components/GameManager/GameManager';
import GameEdit from './components/GameEdit/GameEdit';
import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./Page.module.css";

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false); // 追加
  const [currentScreen, setCurrentScreen] = useState<string>("TypingGame");

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function handleMenuItemClick(item: string) {
    if (item === "Menu Item 1") {
      setCurrentScreen("GameManager");
      setMenuOpen(false);
      setExpanded(false); // メニューを閉じる時は拡張状態をリセット
    } else if (item === "Menu Item 2") {
      setCurrentScreen("GameEdit");
      setMenuOpen(false);
      setExpanded(false); // メニューを閉じる時は拡張状態をリセット
    } else if (item === "Menu Item 3") {
      setExpanded(prev => !prev); // メニューを拡張またはリセット
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
        isExpanded={isExpanded} // 追加
      />
      <main
        style={{
          marginLeft: isMenuOpen ? (isExpanded ? "300px" : "250px") : "0", // サイドメニューの幅に応じたマージン設定
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
