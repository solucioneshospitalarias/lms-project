import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Users,
  User,
  BookOpen,
  Eye,
  EyeOff,
  ChevronLeft,
} from "lucide-react";
import styles from "./RegisterProfesor.module.css";

const RegisterProfesor = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 1. DEFINIR EL ESTADO INICIAL (Indispensable)
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: "",
    email: "",
    password: "",
  });

  // 2. FUNCIÓN PARA ACTUALIZAR LOS DATOS AL ESCRIBIR
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiamos el error del campo específico mientras el usuario escribe
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

    // 3. VALIDACIÓN DE CAMPOS OBLIGATORIOS
    if (!formData.nombre.trim()) newErrors.nombre = "Este campo es obligatorio";
    if (!formData.especialidad.trim())
      newErrors.especialidad = "Este campo es obligatorio";
    if (!formData.email.trim()) newErrors.email = "Este campo es obligatorio";
    if (!formData.password.trim())
      newErrors.password = "Este campo es obligatorio";

    setErrors(newErrors);

    // Si no hay errores, procedemos
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("Solicitud de registro enviada con éxito");
        // Aquí puedes disparar el confeti alegre
      }, 2000);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className={styles.fullPageContainer}>
      <div className={styles.backgroundWrapper}></div>
      <div className={styles.overlay}></div>

      <div className={`${styles.registerCard} fadeUpEffect`}>
        <div className={styles.iconHeader}>
          <Users size={32} color="white" />
        </div>

        <h2>Solicitud de Registro Docente</h2>
        <p className={styles.subtitle}>
          Únete a la plataforma educativa. Inicia tu proceso de validación.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Campo: Nombre Completo */}
          <div className={styles.inputGroup}>
            <label>Nombre Completo:</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                type="text"
                name="nombre"
                placeholder="Tu Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? styles.inputError : ""}
              />
            </div>
            {errors.nombre && (
              <span className={styles.errorMessage}>{errors.nombre}</span>
            )}
          </div>

          {/* Campo: Especialidad */}
          <div className={styles.inputGroup}>
            <label>Especialidad:</label>
            <div className={styles.inputWrapper}>
              <BookOpen className={styles.inputIcon} size={20} />
              <input
                type="text"
                name="especialidad"
                placeholder="Especialidad (Ej: Matemática, Historia)"
                value={formData.especialidad}
                onChange={handleChange}
                className={errors.especialidad ? styles.inputError : ""}
              />
            </div>
            {errors.especialidad && (
              <span className={styles.errorMessage}>{errors.especialidad}</span>
            )}
          </div>

          {/* Campo: Correo Institucional */}
          <div className={styles.inputGroup}>
            <label>Correo Electrónico:</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                name="email"
                placeholder="correo@institucion.edu"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ""}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div className={styles.inputGroup}>
            <label>Crea tu contraseña:</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Crear Tu contraseña docente"
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
          </div>

          <button type="submit" className={styles.btnMain} disabled={isLoading}>
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                Solicitar Cuenta Docente <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className={styles.footerText}>
          ¿Ya tienes cuenta de profesor?{" "}
          <Link to="/login-profesor" replace>
            Inicia sesión aquí
          </Link>
        </div>

        <button className={styles.backButton} onClick={handleBack}>
          <ChevronLeft size={16} /> Volver al acceso alumnos
        </button>
      </div>
    </div>
  );
};

export default RegisterProfesor;
