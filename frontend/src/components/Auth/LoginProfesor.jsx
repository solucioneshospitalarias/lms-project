import React, { useState, useEffect } from "react";
import { useNavigate, Link, replace } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowLeft,
  Users,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2, // Importamos el icono de carga
} from "lucide-react";
import styles from "./LoginProfesor.module.css";

const LoginProfesor = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el spinner

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBack = () => {
    navigate("/login", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Este campo es obligatorio";
    if (!formData.password.trim()) newErrors.password = "Este campo es obligatorio";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Activamos el spinner

      setTimeout(() => {
        navigate("/panel-profesor", { replace: true });   // { replace: true } por si llega a pasar un error de devolver
      }, 1500);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label>Ingresa tu correo electrónico:</label>
          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} size={20} />
            <input
              type="email"
              name="email"
              placeholder="correo@institucion.edu"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.email ? styles.inputError : ""}
            />
          </div>
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}

          <label>Ingresa tu contraseña:</label>
          <div className={styles.inputWrapper}>
            <Lock className={styles.inputIcon} size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Tu contraseña docente"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.password ? styles.inputError : ""}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}

          {/* Botón Principal con Spinner */}
          <button
            type="submit"
            className={styles.btnMain}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className={styles.spinner} size={20} />
                Verificando...
              </>
            ) : (
              "Entrar al Panel"
            )}
          </button>

          <button
            type="button"
            className={styles.btnBackRegister}
            onClick={() => navigate("/", { replace: true })}
            disabled={isLoading}
          >
            <ArrowLeft size={16} /> Regresar al inicio
          </button>
        </form>

        <div className={styles.footerText}>
          ¿No tienes cuenta?{" "}
          <Link to="/register-profesor" replace>
            Solicitar registro
          </Link>
        </div>

        <button
          className={styles.backButton}
          onClick={handleBack}
          disabled={isLoading}
        >
          <ChevronLeft size={16} /> Volver al acceso alumnos
        </button>
      </div>
    </div>
  );
};

export default LoginProfesor;