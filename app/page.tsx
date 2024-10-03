"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import GameManager from './components/GameManager/GameManager';
import GameEdit from './components/GameEdit/GameEdit';
import Chat from "./components/Chat/chat";
import SideMenu from "./components/SideMenu/SideMenu";
import Log from "./components/Log/log";
import styles from "./Page.module.css";
import { MenuItem } from "./components/types"; // 型定義をインポート

// 画面コンポーネントのマップを定義
const screenComponents = {
  TypingGame: <TypingGame />,
  GameManager: <GameManager />,
  GameEdit: <GameEdit />,
  Chat: <Chat setLogEntries={() => {}} logEntries={[]} />,  // 初期値を設定
  Log: <Log logEntries={[]} />  // 初期値を設定
};

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<keyof typeof screenComponents>("TypingGame");

  // ログエントリの状態を管理
  const [logEntries, setLogEntries] = useState<{ message: string; wordList: { display: string }[] }[]>([]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // handleMenuItemClick の引数に MenuItem 型を指定
  const handleMenuItemClick = (item: MenuItem) => {
    const screenMap: { [key in MenuItem]?: keyof typeof screenComponents } = {
      "Menu Item 1": "GameManager",
      "Menu Item 2": "GameEdit",
      "Menu Item 3": "Chat",
      "Menu Item 4": "Log",  // 追加
    };

    if (screenMap[item]) {
      setCurrentScreen(screenMap[item]!);  // 型の保証のために `!` を使用
      setMenuOpen(false);
      setExpanded(false);
    } else if (item === "Expand Menu") {
      setExpanded(!isExpanded);
    } else {
      setCurrentScreen("TypingGame");
    }
  };

  useEffect(() => {
    // キーリスナーを初期化し、クリーンアップのためのリスナー削除関数を設定
    const removeListener = initializeKeyListener(toggleMenu);
    return () => removeListener();
  }, []);

  return (
    <div>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} onMenuItemClick={handleMenuItemClick} />
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onMenuItemClick={handleMenuItemClick}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
      />
      <main
        style={{
          marginLeft: isMenuOpen ? (isExpanded ? "300px" : "250px") : "0",
          transition: "margin-left 0.3s"
        }}
      >
        <div className={styles.pageContents}>
          {/* 選択された画面コンポーネントを表示 */}
          {currentScreen === "Chat" || currentScreen === "Log" ? (
            React.cloneElement(screenComponents[currentScreen], { setLogEntries, logEntries })
          ) : (
            screenComponents[currentScreen]
          )}
        </div>
      </main>
    </div>
  );
}
