import React from "react";
import styles from "./Header.module.css";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logoRutas from "../../../assets/logoRutas.png";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logoContainer}>
          <img
            src={logoRutas}
            alt="Rutas del Saber"
            className={styles.mainLogo}
          />
        </Link>

        {/* Menú de navegación dinámico */}
        <ul className={styles.navMenu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <div className={styles.navItemContent}>
                <span>Inicio</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/conocenos"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <div className={styles.navItemContent}>
                <span>Conócenos</span> <ChevronDown size={14} /> {/* Agregamos la flechita */}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/estadisticas"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <div className={styles.navItemContent}>
                <span>Estadísticas</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/productos"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <div className={styles.navItemContent}>
                <span>Productos</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recursos"
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              <div className={styles.navItemContent}>
                <span>Recursos Educativos</span> <ChevronDown size={14} />
              </div>
            </NavLink>
          </li>
        </ul>

        {/* Derecha: Toggle y Botón ÚNICO de Login */}
        <div className={styles.topbarRight}>
          <div className={styles.authButtons}>
            <ThemeToggle />
            <Link to="/login" className={styles.btnLogin}>
              INICIAR SESIÓN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;