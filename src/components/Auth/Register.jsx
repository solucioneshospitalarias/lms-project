import React from 'react';
import styles from './Login.module.css'; // Reutilizamos tus estilos 3D
import { Mail, Lock, User, ShieldCheck, ArrowRight, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
    const handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/v3/signin/identifier";
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.cardGlow}></div>

                <div className={styles.header}>
                    <h2>Crear <span>Cuenta</span></h2>
                    <p>Únete a Rutas del Saber y comienza tu aprendizaje.</p>
                </div>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    {/* Fila de Nombres y Apellidos */}
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label>Nombres</label>
                            <div className={styles.inputWrapper}>
                                <User className={styles.icon} size={18} />
                                <input type="text" placeholder="Nombre" />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Apellidos</label>
                            <div className={styles.inputWrapper}>
                                <User className={styles.icon} size={18} />
                                <input type="text" placeholder="Apellido" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Correo Electrónico</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.icon} size={18} />
                            <input type="email" placeholder="ejemplo@rutas.com" />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Contraseña</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.icon} size={18} />
                            <input type="password" placeholder="Mínimo 8 caracteres" />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Confirmar Contraseña</label>
                        <div className={styles.inputWrapper}>
                            <ShieldCheck className={styles.icon} size={18} />
                            <input type="password" placeholder="Repite tu contraseña" />
                        </div>
                    </div>

                    <button type="submit" className={styles.btnMain}>
                        Crear Cuenta <ArrowRight size={18} />
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>O regístrate con</span>
                </div>

                <button type="button" className={styles.btnGoogle} onClick={handleGoogleLogin}>
                    <Chrome size={20} /> Google
                </button>

                <p className={styles.footerText}>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;