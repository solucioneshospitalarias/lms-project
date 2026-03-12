import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import styles from './PanelProfesor.module.css';
import CapiLogo from '../../../assets/favicon.ico'

const PanelProfesor = () => {
    const navigate = useNavigate();

    const misGrados = [
        { id: '1', grado: '6°', nombre: 'Sexto A', guias: 4, color: '#c22821' },
        { id: '2', grado: '7°', nombre: 'Séptimo B', guias: 3, color: '#e63946' },
        { id: '3', grado: '8°', nombre: 'Octavo C', guias: 5, color: '#b21e17' },
    ];

    const handleLogout = () => {
        // Aquí podrías limpiar el localStorage si guardas tokens
        navigate('/login-profesor');
    };

    return (
        <div className={styles.mainWrapper}>
            {/* --- NAVBAR SUPERIOR EXCLUSIVA --- */}
            <nav className={styles.topNav}>
                <div className={styles.logoSection}>
                    <img src={CapiLogo} alt='Logo Capi' className={styles.capiImage} />
                    <span>Rutas del Saber <strong>Docente</strong></span>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </nav>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className={`${styles.container} fadeUpEffect`}>
                <header className={styles.header}>
                    <h1>Entorno del <span>Docente</span></h1>
                    <p>Gestiona el material pedagógico de tus grados asignados.</p>
                </header>

                <div className={styles.grid}>
                    {misGrados.map((item, index) => (
                        <div
                            key={item.id}
                            className={styles.card}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.iconBox} style={{ backgroundColor: item.color }}>
                                {item.grado}
                            </div>
                            <div className={styles.info}>
                                <h3>{item.nombre}</h3>
                                <p>{item.guias} Guías Pedagógicas</p>
                            </div>
                            <button className={styles.btn}>Entrar a la Guía</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PanelProfesor;