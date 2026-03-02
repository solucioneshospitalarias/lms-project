import { useEffect, useState } from 'react';
import styles from './Header.module.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  const setDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        checked={isDark}
        onChange={(e) => setDarkMode(e.target.checked)}
      />
      <span className={styles.slider}>
        {/* Estrellas */}
        <div className={`${styles.star} ${styles.star_1}`}></div>
        <div className={`${styles.star} ${styles.star_2}`}></div>
        <div className={`${styles.star} ${styles.star_3}`}></div>
        
        {/* Nube */}
        <svg viewBox="0 0 16 16" className={styles.cloud}>
          <path
            fill="#fff"
            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            transform="matrix(.77976 0 0 .78395-299.99-418.63)"
          />
        </svg>
      </span>
    </label>
  );
};

export default ThemeToggle;