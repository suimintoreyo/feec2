// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";
import TypingGame from "./components/TypingGameF/TypingGame";
import styles from "./Page.module.css";

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    const removeListener = initializeKeyListener(toggleMenu);
    return () => removeListener();
  }, []);

  return (
    <div>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main
        style={{
          marginLeft: isMenuOpen ? "250px" : "0",
          transition: "margin-left 0.3s",
        }}
      >
        <div className={styles.pageContents}>
          {
            //         <h1>Welcome to the Home Page</h1>
            //         <p>This is your content</p>
          }
          <TypingGame />
        </div>
      </main>
    </div>
  );
}
