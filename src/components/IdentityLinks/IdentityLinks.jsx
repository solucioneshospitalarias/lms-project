import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faEye, faGem, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
                        <button onClick={() => navigate('/conocenos')} className={styles.premiumBtn}>
                            <div className={styles.btnContent}>
                                <FontAwesomeIcon icon={faRocket} className={styles.icon} />
                                <span>Ver Misión</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
                        </button>

                        <button onClick={() => navigate('/conocenos')} className={styles.premiumBtn}>
                            <div className={styles.btnContent}>
                                <FontAwesomeIcon icon={faEye} className={styles.icon} />
                                <span>Ver Visión</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
                        </button>

                        <button onClick={() => navigate('/conocenos')} className={styles.premiumBtn}>
                            <div className={styles.btnContent}>
                                <FontAwesomeIcon icon={faGem} className={styles.icon} />
                                <span>Ver Valores</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdentityLinks;