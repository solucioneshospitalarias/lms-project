// src/components/layout/Header/Navbar.jsx
import styles from "./Header.module.css";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logoRutas from "../../../assets/logoRutas.png";

const Navbar = () => {
  // Función para volver al inicio suavemente
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo interactivo: Casita + Texto en 2 líneas */}
        <div className={styles.logoContainer} onClick={scrollToTop}>
          <img
            src={logoRutas}
            alt="Rutas del Saber"
            className={styles.mainLogo}
          />
        </div>

        {/* Menú de navegación */}
        <ul className={styles.navMenu}>
          <li className={styles.active}>
            <div className={styles.navItemContent}>
              <span>Inicio</span> <ChevronDown size={14} />
            </div>
          </li>
          <li>
            <div className={styles.navItemContent}>
              <span>¿Quiénes somos?</span> <ChevronDown size={14} />
            </div>
          </li>
          <li>
            <div className={styles.navItemContent}>
              <span>Estadísticas</span> <ChevronDown size={14} />
            </div>
          </li>
          <li>
            <div className={styles.navItemContent}>
              <span>Productos</span> <ChevronDown size={14} />
            </div>
          </li>
          <li>
            <div className={styles.navItemContent}>
              <span>Recursos Educativos</span> <ChevronDown size={14} />
            </div>
          </li>
        </ul>

        <div className={styles.topbarRight}>
          <div className={styles.authButtons}>
            <ThemeToggle />
            <button className={styles.btnLogin}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
