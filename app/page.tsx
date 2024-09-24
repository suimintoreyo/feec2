"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import styles from "./Page.module.css";
import Chat from "./components/Chat/chat";
import SideMenu from "./components/SideMenuF/SideMenu";
import Log from "./components/Log/log"; 

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isTypingGameVisible, setTypingGameVisible] = useState(true);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isChatListVisible, setChatListVisible] = useState(false);
  const [isLogVisible, setLogVisible] = useState(false);

  // ログエントリの状態を管理
  const [logEntries, setLogEntries] = useState<{ message: string; wordList: { display: string }[] }[]>([]);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function handleMenuItemClick(item: string) {
    if (item === "Menu Item 1") {
      setTypingGameVisible(false);
      setChatVisible(true);
      setChatListVisible(false);
      setLogVisible(false);
    } else if (item === "Menu Item 3") {
      setTypingGameVisible(false);
      setChatVisible(false);
      setChatListVisible(true);
      setLogVisible(false);
    } else if (item === "Menu Item 4") {
      setTypingGameVisible(false);
      setChatVisible(false);
      setChatListVisible(false);
      setLogVisible(true);
    } else {
      setTypingGameVisible(true);
      setChatVisible(false);
      setChatListVisible(false);
      setLogVisible(false);
    }
  }

  useEffect(() => {
    const removeListener = initializeKeyListener(toggleMenu);
    return () => removeListener();
  }, []);

  return (
    <div>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onMenuItemClick={handleMenuItemClick}
      />
      <main
        style={{
          marginLeft: isMenuOpen ? "250px" : "0",
          transition: "margin-left 0.3s",
        }}
      >
        <div className={styles.pageContents}>
          {isTypingGameVisible && <TypingGame />}
          {isChatVisible && <Chat setLogEntries={setLogEntries} logEntries={logEntries} />}
          {isChatListVisible && <Chat setLogEntries={setLogEntries} logEntries={logEntries} />}
          {isLogVisible && <Log logEntries={logEntries} />} {/* logEntries を Log に渡す */}
        </div>
      </main>
    </div>
  );
}
