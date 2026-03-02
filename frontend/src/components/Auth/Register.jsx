import React, { useState } from 'react';
import styles from './Login.module.css'; // Reutilizamos tus estilos 3D
import { Mail, Lock, User, ShieldCheck, ArrowRight, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newErrors = {};

        // Validación de campos
        if (!form[0].value) newErrors.nombres = "Los nombres son obligatorios";
        if (!form[1].value) newErrors.apellidos = "Los apellidos son obligatorios";
        if (!form[2].value) newErrors.email = "El correo es obligatorio";
        if (!form[3].value) newErrors.password = "La contraseña es obligatoria";
        if (form[4].value !== form[3].value) {
            newErrors.confirm = "Las contraseñas no coinciden";
        } else if (!form[4].value) {
            newErrors.confirm = "Debes confirmar tu contraseña";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Formulario válido, enviando...");
            // Aquí iría tu lógica de registro
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/";
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.cardGlow}></div>

                <div className={styles.header}>
                    <h2>Crear <span>Cuenta</span></h2>
                    <p>Únete a Rutas del Saber y comienza tu aprendizaje.</p>
                </div>

                {/* IMPORTANTE: Cambié el onSubmit para que use handleSubmit */}
                <form className={styles.form} onSubmit={handleSubmit}>

                    {/* Fila de Nombres y Apellidos */}
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label>Nombres:</label>
                            <div className={styles.inputWrapper}>
                                <User className={styles.icon} size={18} />
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className={errors.nombres ? styles.inputError : ''}
                                />
                            </div>
                            {errors.nombres && <span className={styles.errorText}>{errors.nombres}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Apellidos:</label>
                            <div className={styles.inputWrapper}>
                                <User className={styles.icon} size={18} />
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    className={errors.apellidos ? styles.inputError : ''}
                                />
                            </div>
                            {errors.apellidos && <span className={styles.errorText}>{errors.apellidos}</span>}
                        </div>
                    </div>

                    {/* Correo Electrónico */}
                    <div className={styles.inputGroup}>
                        <label>Correo Electrónico:</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.icon} size={18} />
                            <input
                                type="email"
                                placeholder="ejemplo@rutas.com"
                                className={errors.email ? styles.inputError : ''}
                            />
                        </div>
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    {/* Contraseña */}
                    <div className={styles.inputGroup}>
                        <label>Contraseña:</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.icon} size={18} />
                            <input
                                type="password"
                                placeholder="Mínimo 8 caracteres"
                                className={errors.password ? styles.inputError : ''}
                            />
                        </div>
                        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className={styles.inputGroup}>
                        <label>Confirmar Contraseña:</label>
                        <div className={styles.inputWrapper}>
                            <ShieldCheck className={styles.icon} size={18} />
                            <input
                                type="password"
                                placeholder="Repite tu contraseña"
                                className={errors.confirm ? styles.inputError : ''}
                            />
                        </div>
                        {errors.confirm && <span className={styles.errorText}>{errors.confirm}</span>}
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