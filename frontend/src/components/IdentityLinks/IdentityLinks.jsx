import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RocketIcon, Eye, Gem, ChevronRight } from 'lucide-react';
import styles from './IdentityLinks.module.css';

const IdentityLinks = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.heroParallax}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    {/* TÍTULO CON GRADIENTE Y SOMBRA SUTIL */}
                    <h2 className={styles.mainTitle}>
                        Nuestra <span className={styles.accentText}>Identidad</span>
                    </h2>
                    <p className={styles.subtitle}>Descubre los pilares que guían el futuro de la educación.</p>

                    <div className={styles.buttonGrid}>
                        <button onClick={() => navigate('/conocenos#mision')} className={styles.premiumBtn}>
                            <div className={styles.btnContent}>
                                <RocketIcon className={styles.icon} />
                                <span>Ver Misión</span>
                            </div>
                            <ChevronRight className={styles.arrow} />
                        </button>

                        <button onClick={() => navigate('/conocenos#vision')} className={styles.premiumBtn}>
                            <div className={styles.btnContent}>
                                <Eye className={styles.icon} />
                                <span>Ver Visión</span>
                            </div>
                            <ChevronRight className={styles.arrow} />
                        </button>

                        <button onClick={() => navigate('/conocenos#valores')} className={styles.premiumBtn}>
                            <div className={styles.btnContent}>
                                <Gem className={styles.icon} />
                                <span>Ver Valores</span>
                            </div>
                            <ChevronRight className={styles.arrow} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdentityLinks;