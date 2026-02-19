import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import styles from './PersonalizedService.module.css';
import supportImg from '../../assets/MujerAtencion.png';

const PersonalizedService = () => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}> {/* Contenedor de centrado senior */}
                <div
                    className={styles.card}
                    onMouseMove={handleMouseMove}
                    style={{ '--x': `${mousePos.x}%`, '--y': `${mousePos.y}%` }}
                >
                    <div className={styles.glowEffect}></div>

                    <div className={styles.contentGrid}>
                        <div className={styles.textSide}>
                            <div className={styles.badge}>
                                <FontAwesomeIcon icon={faComments} />
                                <span>Soporte Directo</span>
                            </div>
                            <h2 className={styles.mainTitle}>
                                ¿Quieres <br />
                                <span className={styles.accent}>atención personalizada?</span>
                            </h2>
                            <p className={styles.subText}>
                                Nuestro equipo de expertos está listo para asesorarte de manera única.
                                Resolvamos tus dudas en tiempo real.
                            </p>
                            <a
                                href="https://wa.me/573234876604?text=Hola,%20necesito%20atención%20personalizada%20sobre%20Rutas%20del%20Saber%20😁"
                                className={styles.contactBtn}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} />
                                Contactar ahora
                            </a>
                        </div>

                        <div className={styles.imageSide}>
                            <img src={supportImg} alt="Asesoría" className={styles.personImage} />
                            <div className={styles.fadeOverlay}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalizedService;