import styles from './SidebarProfesor.module.css';
import { NAV_ITEMS, PROFESOR } from '../constants/Data';
import icono from '../../../../assets/favicon.ico'

const SidebarProfesor = ({ activeTab, setActiveTab, isOpen, onToggle }) => {
    return (
        <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ''}`}>

            <div className={styles.sidebarTop}>
                <div className={styles.brand}>
                    <div className={styles.logoMark}>
                        <img
                            src={icono}
                            alt="Logo Rutas del Saber"
                            className={styles.logoImage}
                        />
                    </div>
                    {isOpen && <span className={styles.brandNombre}>Rutas del Saber</span>}
                </div>
            </div>

            {/* ── Navegación ── */}
            <nav className={styles.navMenu}>
                {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.key || (item.key === 'grupos' && activeTab === 'detalle');
                    return (
                        <button
                            key={item.key}
                            className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ''}`}
                            onClick={() => setActiveTab(item.key)}
                            title={!isOpen ? item.label : undefined}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {isOpen && <span className={styles.navLabel}>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* ── Perfil docente (solo cuando está abierto) ── */}
            {isOpen && (
                <div className={styles.sidebarFooter}>
                    <div className={styles.profeCard}>
                        <div className={styles.profeAvatar}>{PROFESOR.iniciales}</div>
                        <div className={styles.profeInfo}>
                            <span className={styles.profeNombre}>{PROFESOR.nombre}</span>
                            <span className={styles.profeCargo}>{PROFESOR.cargo}</span>
                        </div>
                    </div>
                </div>
            )}

        </aside>
    );
};

export default SidebarProfesor;