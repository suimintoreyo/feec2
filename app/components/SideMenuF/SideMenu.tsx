import React, { useEffect, useState } from "react"; // useStateをインポート
import { motion } from "framer-motion";
import styles from "./SideMenu.module.css";
import SideMenuButton from "./SideMenuButton";
import Settings from "../SettingsF/Settings";

type SideMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

function SideMenu({ isOpen, toggleMenu }: SideMenuProps): JSX.Element {
  // 設定メニューの開閉を管理するためのstate
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // 追加のアニメーション管理は不要
    }
  }, [isOpen]);

  function toggleSettings() {
    setSettingsOpen(!isSettingsOpen);
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
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
        <li>Menu Item 4</li>
      </ul>
      <button onClick={toggleSettings}>設定</button>
      <Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
    </motion.div>
  );
}

export default SideMenu;
