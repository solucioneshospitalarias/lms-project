import React, { useState } from "react"; // Paso 1: Importar useState
import styles from "./Login.module.css";
import { Mail, Lock, ArrowRight, Chrome, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Img1 from "../../assets/Item1.png";
import Img2 from "../../assets/Item2.png";
import Img3 from "../../assets/Item3.png";
import Img4 from "../../assets/Item4.png";

const Login = () => {
  // Paso 2: Crear el estado para los errores
  const [errors, setErrors] = useState({ email: false, password: false });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/";
  };

  // Paso 3: Crear la función que valida al hacer clic en "Iniciar Sesión"
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Obtener valores
    const email = e.target[0].value;
    const password = e.target[1].value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Usamos variables locales para decidir si enviamos o no
    let emailError = "";
    let passwordError = "";

    // 2. Validar Email
    if (!email.trim()) {
      emailError = "Este campo es obligatorio";
    } else if (!emailRegex.test(email)) {
      emailError = "Formato de correo inválido (ejemplo@rutas.com)";
    }

    // 3. Validar Password
    if (!password.trim()) {
      passwordError = "Este campo es obligatorio";
    }

    // 4. UNA SOLA actualización de estado
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // 5. Proceder si no hay errores
    if (!emailError && !passwordError) {
      console.log("¡Formulario listo para enviar!");
      // Aquí tu lógica de Firebase o API
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.mainWrapper}>
        <div className={styles.infoSection}>
          <div className={styles.floatingDecorations}>
            <img
              src={Img1}
              className={`${styles.floatItem} ${styles.item1}`}
              alt="decoracion"
            />
            <img
              src={Img2}
              className={`${styles.floatItem} ${styles.item2}`}
              alt="decoracion"
            />
            <img
              src={Img3}
              className={`${styles.floatItem} ${styles.item3}`}
              alt="decoracion"
            />
            <img
              src={Img4}
              className={`${styles.floatItem} ${styles.item4}`}
              alt="decoracion"
            />
          </div>

          <h1 className={styles.logoText}>
            Rutas del <span>Saber</span>
          </h1>
          <p className={styles.description}>
            La plataforma líder en educación vial. Conéctate, aprende y domina
            las señales de tránsito de forma interactiva.
          </p>
        </div>

        <div className={styles.loginCard}>
          <div className={styles.cardGlow}></div>

          <div className={styles.header}>
            <h2>Bienvenido</h2>
            <p>Ingresa a tu cuenta para continuar.</p>
          </div>

          {/* Paso 4: Cambiar el onSubmit para que use nuestra validación */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Correo Electrónico:</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.icon} size={16} />
                <input
                  type="email"
                  placeholder="ejemplo@rutas.com"
                  className={errors.email ? styles.inputError : ""}
                />
              </div>
              {/* Solo una vez y dinámico: mostrará "obligatorio" o "formato inválido" */}
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Contraseña:</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={16} />
                <input
                  type={showPassword ? "text" : "password"} // Si es true, se ve el texto. Si es false, son puntos.
                  placeholder="Tu contraseña"
                  className={errors.password ? styles.inputError : ""}
                />
                {/* Botón del ojo */}
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                >
                  {/* INVERTIMOS: Si showPassword es true (se ve), mostramos el ojo abierto para indicar que ya es visible */}
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>
                  Este campo es obligatorio
                </span>
              )}
            </div>

            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" /> <span>Recordarme</span>
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button type="submit" className={styles.btnMain}>
              Iniciar Sesión <ArrowRight size={18} />
            </button>
          </form>

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
            ¿No tienes una cuenta? <Link to="/register">Regístrate ahora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
