import { useState, useEffect, useRef } from 'react';
import styles from './TopBar.module.css';
import { ACTIVIDAD_RECIENTE } from '../constants/Data';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { useUser } from '../../../../context/UserContext';

const TopBar = ({ titulo, setActiveTab }) => {
  const { userData } = useUser();

  const [hora, setHora] = useState(new Date());
  const [notifAbierta, setNotifAbierta] = useState(false);
  const [perfilAbierto, setPerfilAbierto] = useState(false);

  const notifRef = useRef(null);
  const perfilRef = useRef(null);

  const handleLogout = () => {
    window.location.replace("/login-profesor");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifAbierta(false);
      }
      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setPerfilAbierto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const horaStr = hora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  const fechaStr = hora.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header className={styles.topBar}>
      <div>
        <h1 className={styles.titulo}>{titulo}</h1>
        <p className={styles.fecha}>{fechaStr} · {horaStr}</p>
      </div>

      <div className={styles.acciones}>
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className={styles.iconBtn}
            onClick={() => {
              setNotifAbierta(!notifAbierta);
              setPerfilAbierto(false);
            }}
          >
            <Bell size={20} />
            <span className={styles.notifDot} />
          </button>

          {notifAbierta && (
            <div className={styles.notifPanel}>
              <div className={styles.notifPanelHeader}>Notificaciones</div>
              {ACTIVIDAD_RECIENTE.slice(0, 3).map((a) => (
                <div key={a.id} className={styles.notifItem}>
                  <span style={{ color: a.color }}>{a.icon}</span>
                  <div><p>{a.texto}</p><small>{a.tiempo}</small></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.perfilContainer} ref={perfilRef}>
          <div
            className={styles.avatar}
            onClick={() => {
              setPerfilAbierto(!perfilAbierto);
              setNotifAbierta(false);
            }}
          >
            {userData.foto ? (
              <img
                src={userData.foto}
                alt="Perfil"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              userData.iniciales
            )}
          </div>

          {perfilAbierto && (
            <div className={styles.userMenu}>
              <button className={styles.menuItem} onClick={() => { setActiveTab('perfil'); setPerfilAbierto(false); }}>
                <User size={16} /> <span>Mi Perfil</span>
              </button>
              <button className={styles.menuItem} onClick={() => { setActiveTab('configuracion'); setPerfilAbierto(false); }}>
                <Settings size={16} /> <span>Configuración</span>
              </button>
              <div className={styles.menuDivider} />
              <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleLogout}>
                <LogOut size={16} /> <span>Salir del Sistema</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;