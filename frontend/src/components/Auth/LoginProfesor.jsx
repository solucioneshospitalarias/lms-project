import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft, Users, ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import styles from "./LoginProfesor.module.css";
import { login } from "../../services/api.js";

const LoginProfesor = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // Error del backend

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setApiError(""); // Limpiar error de API
  };

  const handleBack = () => {
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Limpiar errores previos

    // Validaciones frontend
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Este campo es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato de correo inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Este campo es obligatorio";
    }

    setErrors(newErrors);

    // Si no hay errores, hacer login
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      try {
        // Llamada a la API real
        const response = await login(formData.email, formData.password);

        // Verificar que sea un profesor
        if (response.user.user_type !== "profesor") {
          setIsLoading(false);
          setApiError("Esta cuenta no es de tipo profesor. Por favor, usa el acceso de alumnos.");
          return;
        }

        // Guardar información adicional del usuario
        if (response.user) {
          localStorage.setItem("userData", JSON.stringify(response.user));
        }

        // Pequeño delay para mejor UX
        setTimeout(() => {
          navigate("/panel-profesor", { replace: true });
        }, 500);

      } catch (error) {
        console.error("Error en login profesor:", error);
        setIsLoading(false);

        // Manejar diferentes tipos de errores del backend
        if (error.detail) {
          setApiError(error.detail);
        } else if (error.email) {
          setErrors(prev => ({ ...prev, email: error.email[0] }));
        } else if (error.password) {
          setErrors(prev => ({ ...prev, password: error.password[0] }));
        } else if (error.non_field_errors) {
          setApiError(error.non_field_errors[0]);
        } else if (typeof error === 'string') {
          setApiError(error);
        } else {
          setApiError("Error al iniciar sesión. Por favor, intenta de nuevo.");
        }
      }
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

        {/* Banner de error de la API */}
        {apiError && (
          <div className={styles.apiErrorBanner}>
            <p>{apiError}</p>
          </div>
        )}

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
              disabled={isLoading}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}

          <div className={styles.options}>
            <label className={styles.remember}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Recordarme</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

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