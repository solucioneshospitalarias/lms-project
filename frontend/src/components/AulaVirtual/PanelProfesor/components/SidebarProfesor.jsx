import styles from './SidebarProfesor.module.css';
import { NAV_ITEMS, PROFESOR } from '../constants/Data';
import icono from '../../../../assets/favicon.ico'
import { useUser } from '../../../../context/UserContext';

const SidebarProfesor = ({ activeTab, setActiveTab, isOpen, onToggle }) => {
    const { userData } = useUser();

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

            {isOpen && (
                <div className={styles.sidebarFooter}>
                    <div className={styles.profeCard}>
                        <div className={styles.profeAvatar}>
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

                        <div className={styles.profeInfo}>
                            <span className={styles.profeNombre}>{userData.nombre}</span>
                            <span className={styles.profeCargo}>{userData.rol}</span>
                        </div>
                    </div>
                </div>
            )}

        </aside>
    );
};

export default SidebarProfesor;