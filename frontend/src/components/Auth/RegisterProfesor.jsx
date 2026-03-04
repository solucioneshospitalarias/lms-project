import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// Importamos iconos profesionales para cada campo
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

  const handleBack = () => {
    navigate("/login", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setIsLoading(true); // Inicia la animación SOLO al hacer clic

    setTimeout(() => {
      setIsLoading(false); // Detiene la animación tras 2 segundos
      console.log("Solicitud de registro enviada");
      // navigate("/alguna-ruta");
    }, 2000);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className={styles.fullPageContainer}>
      {/* Fondo del aula desenfocado como en el login de profesores */}
      <div className={styles.backgroundWrapper}></div>
      <div className={styles.overlay}></div>

      {/* Tarjeta de registro centrada con la animación 'fadeUpEffect' global */}
      <div className={`${styles.registerCard} fadeUpEffect`}>
        <div className={styles.iconHeader}>
          {/* Usamos el mismo icono de profesores del login */}
          <Users size={32} color="white" />
        </div>

        <h2>Solicitud de Registro Docente</h2>
        <p className={styles.subtitle}>
          Únete a la plataforma educativa. Inicia tu proceso de validación.
        </p>

        <form className={styles.form}>
          {/* Campo: Nombre Completo con icono de Usuario */}
          <div className={styles.inputGroup}>
            <label>Nombre Completo:</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input type="text" placeholder="Tu Nombre Completo" required />
            </div>
          </div>

          {/* Campo: Especialidad con icono de Libro Abierto */}
          <div className={styles.inputGroup}>
            <label>Especialidad:</label>
            <div className={styles.inputWrapper}>
              <BookOpen className={styles.inputIcon} size={20} />
              <input
                type="text"
                placeholder="Especialidad (Ej: Matemática, Historia)"
                required
              />
            </div>
          </div>

          {/* Campo: Correo Institucional con icono de Carta */}
          <div className={styles.inputGroup}>
            <label>Correo Electronico:</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                placeholder="correo@institucion.edu"
                required
              />
            </div>
          </div>

          {/* Campo: Contraseña con icono de Candado y Ojo intercativo */}
          <div className={styles.inputGroup}>
            <label>Crea tu contraseña:</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Crear Tu contraseña docente"
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {/* Lógica del ojo corregida: Si se ve, muestra abierto; si no, tachado */}
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Botón Principal Rojo */}
          <button
            type="submit"
            className={styles.btnMain}
            disabled={isLoading} // Evita múltiples clics
          >
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

        {/* Botón secundario Gris (usando tus variables globales) */}
        <button
          className={styles.backButton}
          onClick={handleBack} // Redirige al login de alumnos por defecto
        >
          <ChevronLeft size={16} /> Volver al acceso alumnos
        </button>
      </div>
    </div>
  );
};

export default RegisterProfesor;
