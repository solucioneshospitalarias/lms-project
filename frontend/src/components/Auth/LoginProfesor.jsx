import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Users,
  ChevronLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import styles from "./LoginProfesor.module.css";

const LoginProfesor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className={styles.fullPageContainer}>
      <div className={styles.backgroundWrapper}></div>
      <div className={styles.overlay}></div>

      <div className={`${styles.loginCard} fadeUpEffect`}>
        <div className={styles.iconHeader}>
          <Users size={32} color="white" />
        </div>

        <h2>Acceso Docente</h2>
        <p className={styles.subtitle}>
          Gestione sus cursos y alumnos de forma interactiva.
        </p>

        <form className={styles.form}>
          <label>Ingresa tu correo electronico:</label>
          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} size={20} />
            <input type="email" placeholder="correo@institucion.edu" required />
          </div>

          <label>Ingresa tu contraseña:</label>
          <div className={styles.inputWrapper}>
            <Lock className={styles.inputIcon} size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña docente"
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* CORRECCIÓN: Si se ve, mostrar ojo abierto; si no, ojo tachado */}
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Botón Principal */}
          <button type="submit" className={styles.btnMain}>
            Entrar al Panel <ArrowRight size={20} />
          </button>
        </form>

        <div className={styles.footerText}>
          ¿No tienes cuenta?{" "}
          <Link to="/register-profesor" replace>
            Solicitar registro
          </Link>
        </div>

        {/* Botón de volver con más separación */}
        <button className={styles.backButton} onClick={handleBack}>
          <ChevronLeft size={16} /> Volver al acceso alumnos
        </button>
      </div>
    </div>
  );
};

export default LoginProfesor;
