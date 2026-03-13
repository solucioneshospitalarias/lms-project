import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowLeft,
  Users,
  ChevronLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import styles from "./LoginProfesor.module.css";

const LoginProfesor = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 1. ESTADO PARA LOS DATOS (Indispensable para validar)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // 2. FUNCIÓN PARA CAPTURAR LO QUE ESCRIBE EL USUARIO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiamos el error mientras el usuario escribe para que sea "alegre" y fluido
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

    // 3. VALIDACIÓN CORRECTA PARA LOGIN
    if (!formData.email.trim()) newErrors.email = "Este campo es obligatorio";
    if (!formData.password.trim())
      newErrors.password = "Este campo es obligatorio";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login exitoso, disparando confeti...");

      // AGREGAR ESTA LÍNEA:
      navigate("/panel-profesor");
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

        {/* 4. VINCULACIÓN DE INPUTS */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label>Ingresa tu correo electrónico:</label>
          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} size={20} />
            <input
              type="email"
              name="email" // Importante: debe coincidir con el estado
              placeholder="correo@institucion.edu"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ""}
            />
          </div>
          {/* Mensaje de error posicionado fuera del wrapper para no mover el icono */}
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

          <button type="submit" className={styles.btnMain}>
            Entrar al Panel
          </button>

          <button
            type="button"
            className={styles.btnBackRegister}
            onClick={() => navigate("/")}
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

        <button className={styles.backButton} onClick={handleBack}>
          <ChevronLeft size={16} /> Volver al acceso alumnos
        </button>
      </div>
    </div>
  );
};

export default LoginProfesor;
