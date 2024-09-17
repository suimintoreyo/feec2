"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import styles from "./Page.module.css";
import Chat from "./components/Chat/chat";
import ChatList from "./components/ChatList/chatlist";
import SideMenu from "./components/SideMenuF/SideMenu";

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isTypingGameVisible, setTypingGameVisible] = useState(true);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isChatListVisible, setChatListVisible] = useState(false); // ChatList visibility

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function handleMenuItemClick(item: string) {
    if (item === "Menu Item 1") {
      setTypingGameVisible(false);
      setChatVisible(true);
      setChatListVisible(false);
    } else if (item === "Menu Item 3") {
      setTypingGameVisible(false);
      setChatVisible(false);
      setChatListVisible(true); // Show ChatList when Menu Item 3 is clicked
    } else {
      setTypingGameVisible(true);
      setChatVisible(false);
      setChatListVisible(false);
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
          {isChatVisible && <Chat />}
          {isChatListVisible && <ChatList />} {/* Display ChatList */}
        </div>
      </main>
    </div>
  );
}
