// Keyboard.tsx からの重要な部分
import React, { useState, useEffect } from "react";
import styles from "./Keyboard.module.css";

export default function Keyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (keyboardLayout.flat().includes(key)) {
        setActiveKey(key);
      }
    }

    function handleKeyUp() {
      setActiveKey(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((key) => (
            <span
              key={key}
              className={`${styles.key} ${
                key === activeKey ? styles.activeKey : ""
              }`}
            >
              {key.toUpperCase()}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
