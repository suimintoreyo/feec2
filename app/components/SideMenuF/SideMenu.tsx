import React, { useState } from "react"; // React を正しくインポート
import { motion } from "framer-motion";
import styles from "./SideMenu.module.css";
import SideMenuButton from "./SideMenuButton";
import Settings from "../SettingsF/Settings";

type SideMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  onMenuItemClick: (item: string) => void; // クリック時に呼び出す関数の型定義
};

function SideMenu({ isOpen, toggleMenu, onMenuItemClick }: SideMenuProps): JSX.Element {
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false); // 型パラメータを明示

  function toggleSettings() {
    setSettingsOpen(prev => !prev); // ステートのトグル
  }

  function handleMenuItemClick(item: string) {
    onMenuItemClick(item); // メニューアイテムがクリックされたときに関数を呼び出す
  }

  return (
    <motion.div
      className={`${styles.sideMenu} ${!isOpen ? styles.hidden : ''}`}
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={styles.buttonWrapper}>
        <SideMenuButton toggleMenu={toggleMenu} direction="left" />
      </div>

      <ul className={styles.menuList}>
        <li onClick={() => handleMenuItemClick("Menu Item 1")}>Menu Item 1</li>
        <li onClick={() => handleMenuItemClick("Menu Item 2")}>Menu Item 2</li>
        <li onClick={() => handleMenuItemClick("Menu Item 3")}>Menu Item 3</li>
        <li onClick={() => handleMenuItemClick("Menu Item 4")}>Menu Item 4</li>
      </ul>
      <button onClick={toggleSettings}>設定</button>
      <Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
    </motion.div>
  );
}

export default SideMenu;
