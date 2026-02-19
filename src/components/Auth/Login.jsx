import React from 'react';
import styles from './Login.module.css';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {

    // Función para manejar la autenticación con Google
    const handleGoogleLogin = () => {
        // En una implementación real con Firebase o Auth0, aquí iría la lógica de SignIn
        console.log("Redirigiendo al flujo de autenticación de Google...");

        // Simulación de redirección a la cuenta de Google
        window.location.href = "https://accounts.google.com/v3/signin/identifier";
    };

    return (
        <div className={styles.loginPage}>
            {/* Capa de profundidad 3D */}
            <div className={styles.loginCard}>
                <div className={styles.cardGlow}></div>

                <div className={styles.header}>
                    <h2>Bienvenido de <span>Nuevo</span></h2>
                    <p>Ingresa a tu cuenta para continuar tu aprendizaje vial.</p>
                </div>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                            <input type="password" placeholder="" />
                        </div>
                    </div>

                    <div className={styles.options}>
                        <label className={styles.remember}>
                            <input type="checkbox" /> <span>Recordarme</span>
                        </label>
                        <a href="#" className={styles.forgot}>¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className={styles.btnMain}>
                        Iniciar Sesión <ArrowRight size={18} />
                    </button>
                </form>

                {/* Divisor visual profesional antes de Google */}
                <div className={styles.divider}>
                    <span>O continuar con</span>
                </div>

                <button
                    type="button"
                    className={styles.btnGoogle}
                    onClick={handleGoogleLogin}
                >
                    <Chrome size={20} /> Google
                </button>

                <p className={styles.footerText}>
                    ¿No tienes una cuenta? <Link to="/registro">Regístrate ahora</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;