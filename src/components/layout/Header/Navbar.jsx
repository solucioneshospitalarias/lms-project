import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { ChevronDown, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logoRutas from "../../../assets/logoRutas.png";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevenir scroll cuando el menú está abierto
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Limpiar el overflow cuando el componente se desmonte
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/conocenos", label: "Conócenos" },
    { path: "/estadisticas", label: "Estadísticas" },
    { path: "/productos", label: "Productos" },
    { path: "/recursos", label: "Recursos Educativos" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logoContainer} onClick={closeMenu}>
          <img
            src={logoRutas}
            alt="Rutas del Saber"
            className={styles.mainLogo}
          />
        </Link>

        {/* Botón Hamburguesa */}
        <button 
          className={`${styles.hamburgerBtn} ${isMenuOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de navegación dinámico */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              <li>
                <div className={styles.navItemContent}>
                  <span>{item.label}</span> 
                  <ChevronDown size={14} />
                </div>
              </li>
            </NavLink>
          ))}
          
          {/* ThemeToggle en móvil */}
          <li className={styles.mobileOnly}>
            <ThemeToggle />
          </li>
        </ul>

        {/* Derecha: Toggle y Botón ÚNICO de Login (visible en desktop) */}
        <div className={styles.topbarRight}>
          <div className={styles.authButtons}>
            <ThemeToggle />
            <Link
              to="/login"
              className={styles.btnLogin}
              rel="noopener noreferrer"
            >
              INICIAR SESIÓN
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.show : ''}`} 
        onClick={closeMenu}
      ></div>
    </nav>
  );
};

export default Navbar;