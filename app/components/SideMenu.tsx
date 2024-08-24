// app/components/SideMenu.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './SideMenu.module.css';

type SideMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <motion.div
      className={styles.sideMenu}
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <button onClick={toggleMenu} className={styles.closeButton}>Close</button>
      <ul className={styles.menuList}>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
        <li>Menu Item 4</li>
      </ul>
    </motion.div>
  );
};

export default SideMenu;
