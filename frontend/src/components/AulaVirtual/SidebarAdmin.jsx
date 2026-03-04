import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarAdmin.module.css";
import { FaHome, FaBook, FaChartLine, FaUsers, FaCog } from "react-icons/fa";

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {

  const handleItemClick = () => {
    if (!isOpen) {
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
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaBook className={styles.icon} />
          {isOpen && <span>Calendario</span>}
        </NavLink>

        {/* Estadísticas */}
        <NavLink
          to="/aula-virtual/estadisticas"
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaChartLine className={styles.icon} />
          {isOpen && <span>Estadísticas</span>}
        </NavLink>

        {/* Comunidad */}
        <NavLink
          to="/aula-virtual/comunidad"
          onClick={handleItemClick} // CAMBIADO: onClick
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FaUsers className={styles.icon} />
          {isOpen && <span>Comunidad</span>}
        </NavLink>
      </nav>

      {/* Sección de abajo para Configuración */}
      <div className={styles.footerSection}>
        <NavLink
          to="/aula-virtual/configuracion"
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
