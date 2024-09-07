import React from 'react';
import { motion } from 'framer-motion';
import styles from './SideMenu.module.css';
import SideMenuButtonIcon from '../../public/Side-menu-button.svg';
import SideMenuButtonCloseIcon from '../../public/Side-menu-button-close.svg';
import SideMenuButtonOpenIcon from '../../public/Side-menu-button-open.svg';

type SideMenuButtonProps = {
  toggleMenu: () => void;
  direction: 'left' | 'right';
};

const useHover = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    bind: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  };
};

function SideMenuButton({ toggleMenu, direction }: SideMenuButtonProps): JSX.Element {
  const { isHovered, bind } = useHover();
  const Icon = direction === 'left' ? SideMenuButtonCloseIcon : SideMenuButtonOpenIcon;

  return (
    <div className={styles.buttonWrapper} {...bind}>
      <button onClick={toggleMenu} className={styles.closeButton}>
        <div className={styles.iconFade}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className={styles.iconContainer}
          >
            <Icon width={24} height={24} />
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className={styles.iconContainer}
          >
            <SideMenuButtonIcon width={24} height={24} />
          </motion.div>
        </div>
      </button>
    </div>
  );
}

export default SideMenuButton;
