import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { FaBars, FaPlus, FaTh, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import styles from "./NavbarAula.module.css";
import logo from "../../assets/favicon.ico";

const NavbarAula = ({ toggleSidebar }) => {
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

  const userData = {
    name: "Walter Steven",
    avatarColor: "#f39c12"
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.brand}>Rutas del Saber | Plataforma en Línea</span>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}><FaPlus /></button>
        <button className={styles.iconBtn}><FaTh /></button>

        <div className={styles.avatarContainer} ref={menuRef}>
          <div
            className={styles.avatar}
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            style={{ backgroundColor: userData.avatarColor }}
          >
            {userData.name.charAt(0)}
          </div>

          {showAccountMenu && (
            <div className={styles.accountMenu}>
              <div className={styles.profileHeader}>
                <div className={styles.largeAvatar} style={{ backgroundColor: userData.avatarColor }}>
                  {userData.name.charAt(0)}
                </div>
                <div className={styles.profileInfo}>
                  <p className={styles.userName}>{userData.name}</p>
                  <p className={styles.userCode}>{userData.code}</p>
                  <button className={styles.viewProfileBtn}>Ver perfil</button>
                </div>
              </div>

              <div className={styles.menuDivider}></div>

              <div className={styles.menuOptions}>
                <button className={styles.menuOptionItem}>
                  <FaEnvelope className={styles.optionIcon} />
                  <span>Mensajes</span>
                </button>

                {/* BOTÓN CONECTADO A LA LÓGICA */}
                <button
                  className={styles.menuOptionItem}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className={styles.optionIcon} />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarAula;