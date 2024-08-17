// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { initializeKeyListener } from "./keyPressLogic";

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
          marginLeft: isMenuOpen ? "0px" : "0",
          marginTop: "70px",
          transition: "margin-left 0.3s",
        }}
      >
        <h1>Welcome to the Home Page</h1>
        <p>This is your content</p>
      </main>
    </div>
  );
}
