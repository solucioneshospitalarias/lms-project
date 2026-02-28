import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import styles from './Login.module.css'; // Reutilizamos tus estilos existentes

const ForgotPassword = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.mainWrapper}>

                {/* Lado Izquierdo: Branding (Igual al Login) */}
                <div className={styles.infoSection}>
                    <h1 className={styles.logoText}>Rutas del <span>Saber</span></h1>
                    <p className={styles.description}>
                        La plataforma líder en educación vial. Recupera tu cuenta para seguir aprendiendo de forma interactiva.
                    </p>
                </div>

                {/* Lado Derecho: La Tarjeta de Recuperación */}
                <div className={styles.loginCard}>
                    <div className={styles.cardGlow}></div>

                    <div className={styles.header}>
                        <h2>Recuperar <span>Clave</span></h2>
                        <p style={{ color: '#8b7d7d', marginTop: '10px', fontSize: '0.9rem' }}>
                            Introduce tu correo electrónico para enviarte las instrucciones de restablecimiento.
                        </p>
                    </div>

                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <FaEnvelope className={styles.icon} />
                                <input type="email" placeholder="ejemplo@rutas.com" required />
                            </div>
                        </div>

                        <button type="submit" className={styles.btnMain}>
                            ENVIAR INSTRUCCIONES
                        </button>

                        <div className={styles.divider}>
                            <span>O</span>
                        </div>

                        <Link to="/login" className={styles.btnGoogle} replace={true} style={{ textDecoration: 'none' }}>
                            <FaArrowLeft /> VOLVER AL LOGIN
                        </Link>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;