import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SideMenu.module.css";
import SideMenuButton from "./SideMenuButton";
import Settings from "../Settings/Settings";

type SideMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  onMenuItemClick: (item: string) => void;
  isExpanded: boolean;
};

function SideMenu({ isOpen, toggleMenu, onMenuItemClick, isExpanded }: SideMenuProps): JSX.Element {
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isGameTitleVisible, setGameTitleVisible] = useState<boolean>(false);

  function toggleSettings() {
    setSettingsOpen((prev) => !prev);
  }

  function handleMenuItemClick(item: string) {
    if (item === "Menu Item 1" || item === "Menu Item 2") {
      setGameTitleVisible(false);
      toggleMenu();
    }
    if (item === "Menu Item 3") {
      setGameTitleVisible((prev) => !prev);
    }
    onMenuItemClick(item);
  }

  return (
    <motion.div
      className={`${styles.sideMenu} ${isExpanded ? styles.expanded : ''} ${!isOpen ? styles.hidden : ''}`}
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`${styles.buttonWrapper} ${styles.fixedContent}`}>
        <SideMenuButton toggleMenu={toggleMenu} direction="left" />
      </div>

      <ul className={`${styles.menuList} ${styles.fixedContent}`}>
        <li onClick={() => handleMenuItemClick("Menu Item 1")} className={styles.menuItem1}>
          Menu Item 1
        </li>
        <li onClick={() => handleMenuItemClick("Menu Item 2")} className={styles.menuItem2}>
          Menu Item 2
        </li>
        <li onClick={() => handleMenuItemClick("Menu Item 3")} className={styles.menuItem3}>
          Menu Item 3
        </li>
      </ul>

      {isGameTitleVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${styles.gameTitle} ${styles.fixedContent}`}
        >
          <h3>ゲームタイトル</h3>
        </motion.div>
      )}

      {/* Settings ボタンに settingsButton クラスを追加 */}
      <button onClick={toggleSettings} className={styles.settingsButton}>
        設定
      </button>
      
      <Settings isOpen={isSettingsOpen} onClose={toggleSettings} />
    </motion.div>
  );
}

export default SideMenu;
