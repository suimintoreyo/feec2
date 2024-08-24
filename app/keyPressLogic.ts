// app/keyPressLogic.ts
import { keyConfig } from "./keyConfig";

function handleKeyPress(event: KeyboardEvent, toggleMenu: () => void) {
  const { altKey, key } = keyConfig.openMenuKey;

  if (event.altKey === altKey && event.key.toLowerCase() === key) {
    toggleMenu(); // キー押下でメニューの開閉を切り替え
  }
}

export function initializeKeyListener(toggleMenu: () => void) {
  if (typeof window !== "undefined") {
    const keyPressHandler = (event: KeyboardEvent) =>
      handleKeyPress(event, toggleMenu);
    window.addEventListener("keydown", keyPressHandler);

    return () => window.removeEventListener("keydown", keyPressHandler);
  }
  return () => {};
}
