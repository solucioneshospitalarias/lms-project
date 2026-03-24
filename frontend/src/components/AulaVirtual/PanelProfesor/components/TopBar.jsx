import { useState, useEffect } from 'react';
import styles from './TopBar.module.css';
import { PROFESOR, ACTIVIDAD_RECIENTE } from '../constants/Data';
import { LogOut } from 'lucide-react'

const TopBar = ({ titulo }) => {
  const [hora, setHora] = useState(new Date());
  const [notifAbierta, setNotifAbierta] = useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    window.location.href = "/login-profesor";
  };

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const horaStr = hora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  const fechaStr = hora.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header className={styles.topBar}>

      <title>Rutas del Saber | Panel Profesor</title>

      {/* Título + fecha */}
      <div>
        <h1 className={styles.titulo}>{titulo}</h1>
        <p className={styles.fecha}>{fechaStr} · {horaStr}</p>
      </div>

      {/* Acciones */}
      <div className={styles.acciones}>

        <button className={styles.btnLogout} onClick={handleLogout}>
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>

        {/* Notificaciones */}
        <div style={{ position: 'relative' }}>
          <button className={styles.iconBtn} onClick={() => setNotifAbierta(v => !v)}>
            🔔
            <span className={styles.notifDot} />
          </button>

          {notifAbierta && (
            <div className={styles.notifPanel}>
              <div className={styles.notifPanelHeader}>Notificaciones</div>
              {ACTIVIDAD_RECIENTE.slice(0, 3).map((a) => (
                <div key={a.id} className={styles.notifItem}>
                  <span style={{ color: a.color }}>{a.icon}</span>
                  <div>
                    <p>{a.texto}</p>
                    <small>{a.tiempo}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar docente */}
        <div className={styles.avatar}>{PROFESOR.iniciales}</div>
      </div>

    </header>
  );
};

export default TopBar;