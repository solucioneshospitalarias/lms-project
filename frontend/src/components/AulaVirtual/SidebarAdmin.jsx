import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarAdmin.module.css";
import { FaHome, FaBook, FaLock, FaGraduationCap, FaCog, FaCalendarAlt } from "react-icons/fa";

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {

  const handleItemClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <nav className={styles.navMenu}>
        {/* Panel Principal */}
        <NavLink
          to="/aula-virtual"
          end
          replace={true}
          onClick={handleItemClick} // CAMBIADO: de onDoubleClick a onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaHome className={styles.icon} />
          {isOpen && <span>Panel Principal</span>}
        </NavLink>

        {/* Mis Cursos */}
        <NavLink
          to="/aula-virtual/mis-cursos"
          replace={true}
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaBook className={styles.icon} />
          {isOpen && <span>Mis Cursos</span>}
        </NavLink>

        <NavLink
          to="/aula-virtual/calendario"
          replace={true}
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaCalendarAlt className={styles.icon} />
          {isOpen && <span>Calendario</span>}
        </NavLink>

        {/* Estadísticas */}
        <NavLink
          to="/aula-virtual/restablecer-contraseña"
          replace={true}
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaLock className={styles.icon} />
          {isOpen && <span>Contraseña</span>}
        </NavLink>

        {/* Comunidad */}
        <NavLink
          to="/aula-virtual/desempeños"
          replace={true}
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaGraduationCap className={styles.icon} />
          {isOpen && <span>Mis Desempeños</span>}
        </NavLink>
      </nav>

      {/* Sección de abajo para Configuración */}
      <div className={styles.footerSection}>
        <NavLink
          to="/aula-virtual/configuracion"
          replace={true}
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaCog className={styles.icon} />
          {isOpen && <span>Configuración</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
