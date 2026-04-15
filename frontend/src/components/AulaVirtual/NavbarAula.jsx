import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout, HiOutlineBell } from "react-icons/hi"; // Iconos más minimalistas
import styles from "./NavbarAula.module.css";
import logo from "../../assets/favicon.ico";
import { useUser } from "../../context/UserContext";

const NavbarAula = ({ toggleSidebar }) => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowAccountMenu(false);
    navigate("/login", { replace: true });
  };


  const userDisplay = {
    name: userData.nombre,
    initial: userData.iniciales || userData.nombre.charAt(0).toUpperCase(),
    avatarColor: "#c22821"
  };

  const handleNavigate = (path) => {
    setShowAccountMenu(false);
    navigate(path);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.brandName}>Rutas del Saber | Plataforma en Línea</span>
      </div>

      <div className={styles.right}>
        <button className={styles.notificationBtn}>
          <HiOutlineBell size={22} />
          <span className={styles.dot}></span>
        </button>

        <div className={styles.avatarContainer} ref={menuRef}>
          <div
            className={styles.avatar}
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            style={{ backgroundColor: userDisplay.avatarColor }}
          >
            {userDisplay.initial}
          </div>

          {showAccountMenu && (
            <div className={`${styles.accountMenu} fadeUpEffect`}>
              <button className={styles.menuOptionItem} onClick={() => handleNavigate("/aula-virtual/mi-perfil")}>
                <HiOutlineUser className={styles.optionIcon} size={18} />
                <span>Mi Perfil</span>
              </button>

              <button className={styles.menuOptionItem} onClick={() => handleNavigate("/aula-virtual/configuracion")}>
                <HiOutlineCog className={styles.optionIcon} size={18} />
                <span>Configuración</span>
              </button>

              <div className={styles.menuDivider}></div>

              <button className={`${styles.menuOptionItem} ${styles.logout}`} onClick={handleLogout}>
                <HiOutlineLogout className={styles.optionIcon} size={18} />
                <span>Salir del Sistema</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarAula;