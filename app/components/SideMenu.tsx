import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./SideMenu.module.css";
import SideMenuButton from "./SideMenuButton";

type SideMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

function SideMenu({ isOpen, toggleMenu }: SideMenuProps): JSX.Element {
  useEffect(() => {
    if (!isOpen) {
      // 追加のアニメーション管理が不要です。
    }
  }, [isOpen]);

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
    </motion.div>
  );
}

export default SideMenu;
