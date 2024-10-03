import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SideMenu.module.css";
import SideMenuButton from "./SideMenuButton";
import Settings from "../Settings/Settings";
import { MenuItem } from "../types";  // 型定義をインポート

type SideMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  onMenuItemClick: (item: MenuItem) => void;  // 型を MenuItem に変更
  isExpanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

function SideMenu({ isOpen, toggleMenu, onMenuItemClick, isExpanded, setExpanded }: SideMenuProps): JSX.Element {
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isGameTitleVisible, setGameTitleVisible] = useState<boolean>(false);

  function toggleSettings() {
    setSettingsOpen((prev) => !prev);
  }

  // サイドメニューを閉じるときに全ての状態を初期化
  function handleToggleMenu() {
    setSettingsOpen(false); // 設定画面を閉じる
    setGameTitleVisible(false); // ゲームタイトルを非表示に戻す
    setExpanded(false); // 拡張状態を元に戻す
    toggleMenu(); // サイドメニューを閉じる
  }

  function handleMenuItemClick(item: MenuItem) {
    if (item === "Menu Item 1" || item === "Menu Item 2") {
      setGameTitleVisible(false);
      handleToggleMenu();
    }
    if (item === "Menu Item 3") {
      setGameTitleVisible((prev) => !prev);
    }
    onMenuItemClick(item);
  }

  return (
    <motion.div className={`${styles.sideMenu} ${isExpanded ? styles.expanded : ""} ${!isOpen ? styles.hidden : ""}`} initial={{ x: "-100%" }} animate={{ x: isOpen ? 0 : "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <div className={`${styles.buttonWrapper} ${styles.fixedContent}`}>
        <SideMenuButton toggleMenu={handleToggleMenu} direction="left" />
      </div>
      <ul className={`${styles.menuList} ${styles.fixedContent}`}>
        <li onClick={() => handleMenuItemClick("Menu Item 1")} className={styles.menuItem1}>Menu Item 1</li>
        <li onClick={() => handleMenuItemClick("Menu Item 2")} className={styles.menuItem2}>Menu Item 2</li>
        <li onClick={() => handleMenuItemClick("Menu Item 3")} className={styles.menuItem3}>Menu Item 3</li>
      </ul>
      {isGameTitleVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={`${styles.gameTitle} ${styles.fixedContent}`}>
          <h3>ゲームタイトル 1</h3>
          <h3>ゲームタイトル 2</h3>
          <h3>ゲームタイトル 3</h3>
          <h3>ゲームタイトル 4</h3>
        </motion.div>
      )}
      <button onClick={toggleSettings} className={styles.settingsButton}>設定</button>
      <Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
    </motion.div>
  );
}

export default SideMenu;
