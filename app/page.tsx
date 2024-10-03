"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import GameManager from './components/GameManager/GameManager';
import GameEdit from './components/GameEdit/GameEdit';
import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./Page.module.css";
import RegistrForm from './components/LoginForm';
import { MenuItem } from "./components/types";  // 型定義をインポート

const screenComponents = {
  TypingGame: <TypingGame />,
  GameManager: <GameManager />,
  GameEdit: <GameEdit />
};

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<keyof typeof screenComponents>("TypingGame");

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // handleMenuItemClick の引数に MenuItem 型を指定
  const handleMenuItemClick = (item: MenuItem) => {
    const screenMap: { [key in MenuItem]?: keyof typeof screenComponents } = {
      "Menu Item 1": "GameManager",
      "Menu Item 2": "GameEdit"
    };
    if (screenMap[item]) {
      setCurrentScreen(screenMap[item]!);  // 型の保証のために `!` を使用
      setMenuOpen(false);
      setExpanded(false);
    } else if (item === "Menu Item 3") {
      setExpanded(!isExpanded);
    }
  };

  useEffect(() => initializeKeyListener(toggleMenu), []);

  return (
    <div>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} onMenuItemClick={handleMenuItemClick} />
      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} onMenuItemClick={handleMenuItemClick} isExpanded={isExpanded} setExpanded={setExpanded} />
      <main style={{ marginLeft: isMenuOpen ? (isExpanded ? "300px" : "250px") : "0", transition: "margin-left 0.3s" }}>
        <div className={styles.pageContents}>{screenComponents[currentScreen]}</div>
      </main>
    </div>
  );
}
