import React, { useState, useEffect, useRef } from "react"; // Añadimos useEffect y useRef
import { FaBars, FaPlus, FaTh } from "react-icons/fa";
import styles from "./NavbarAula.module.css";
import logo from "../../assets/favicon.ico";

const NavbarAula = ({ toggleSidebar }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const accounts = [
    { name: "Usuario Rutas", email: "usuario@gmail.com", initial: "U" },
    { name: "Admin Saber", email: "admin@rutasdelsaber.com", initial: "A" },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.brand}>Rutas del Saber</span>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <FaPlus />
        </button>
        <button className={styles.iconBtn}>
          <FaTh />
        </button>

        {/* 3. Le ponemos la referencia (ref={menuRef}) al contenedor del avatar y menú */}
        <div className={styles.avatarContainer} ref={menuRef}>
          <div
            className={styles.avatar}
            onClick={() => setShowAccountMenu(!showAccountMenu)}
          >
            R
          </div>

          {showAccountMenu && (
            <div className={styles.accountMenu}>
              <p className={styles.menuTitle}>Selecciona una cuenta</p>
              {accounts.map((acc, index) => (
                <div key={index} className={styles.accountItem}>
                  <div className={styles.miniAvatar}>{acc.initial}</div>
                  <div>
                    <p className={styles.accName}>{acc.name}</p>
                    <p className={styles.accEmail}>{acc.email}</p>
                  </div>
                </div>
              ))}
              <hr />
              <button className={styles.logoutBtn}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarAula;
