// src/components/layout/Header/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (!isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  return (
    <div className={`${styles.toggleContainer} ${isDark ? styles.darkActive : ''}`} onClick={toggleTheme}>
      <div className={styles.toggleIcon}>
        <Sun size={14} className={isDark ? styles.hideIcon : styles.showIcon} />
        <Moon size={14} className={isDark ? styles.showIcon : styles.hideIcon} />
      </div>
      <div className={styles.toggleBall}></div>
    </div>
  );
};

export default ThemeToggle;