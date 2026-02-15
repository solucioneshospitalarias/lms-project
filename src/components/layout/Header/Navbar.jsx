import React from "react";
import styles from "./Header.module.css";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logoRutas from "../../../assets/logoRutas.png";
// Importamos NavLink para la detección automática de rutas
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo que lleva al Inicio */}
        <Link to="/" className={styles.logoContainer}>
          <img
            src={logoRutas}
            alt="Rutas del Saber"
            className={styles.mainLogo}
          />
        </Link>

        {/* Menú de navegación */}
        <ul className={styles.navMenu}>
          {/* INICIO - La clase .active ahora es dinámica */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <div className={styles.navItemContent}>
                <span>Inicio</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>

          {/* ESTADÍSTICAS - La rayita roja saltará aquí al hacer clic */}
          <li>
            <NavLink
              to="/estadisticas"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <div className={styles.navItemContent}>
                <span>Estadísticas</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>

          {/* Otros botones (puedes añadirles NavLink después) */}
          <li>
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <div className={styles.navItemContent}>
                <span>Productos</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recursos"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <div className={styles.navItemContent}>
                <span>Recursos Educativos</span> <ChevronDown size={14} />
              </div>
            </NavLink>
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
