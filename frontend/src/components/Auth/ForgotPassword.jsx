import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { solicitarRestablecimiento } from "../../services/api";
import { ArrowLeft } from "lucide-react";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import styles from "./Login.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const query = new URLSearchParams(window.location.search);
  const esProfesor = query.get("role") === "profesor";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const tipoUsuario = esProfesor ? "profesor" : "alumno";

      // Enviamos el tipo de usuario a la API (api.js)
      await solicitarRestablecimiento(email, tipoUsuario);

      setIsLoading(false);
      setShowToast(true);

      setTimeout(() => {
        // Redirección automática tras éxito
        navigate(esProfesor ? "/login-profesor" : "/login");
      }, 4000);

    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.error) {
          setError(data.error);
          return;
        }
        if (data.email) {
          setError(Array.isArray(data.email) ? data.email[0] : data.email);
          return;
        }
        setError("Error del servidor");
      } else {
        setError("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      {showToast && (
        <div className={styles.toastNotification}>
          <FaCheckCircle className={styles.toastIcon} />
          <div className={styles.toastText}>
            <strong>¡Contraseña Enviada!</strong>
            <span>Hemos enviado una clave temporal a tu correo.</span>
          </div>
        </div>
      )}

      <div className={styles.mainWrapper}>
        <div className={styles.infoSection}>
          <h1 className={styles.logoText}>
            Rutas del <span>Saber</span>
          </h1>
          <p className={styles.description}>
            La plataforma líder en educación vial. Recupera tu cuenta para
            seguir aprendiendo de forma interactiva.
          </p>
        </div>

        <div className={styles.loginCard}>
          <div className={styles.cardGlow}></div>

          <header className={styles.header}>
            <h2>
              Recuperar <span>Acceso</span>
            </h2>
            <p style={{ color: "var(--primary-gray)", marginTop: "10px", fontSize: "0.9rem" }}>
              Introduce tu correo para recibir una <b>contraseña temporal</b> de acceso inmediato.
            </p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <label style={{ color: "var(--text-main)", fontSize: "0.9rem", fontWeight: "600", marginBottom: "8px", display: "block" }}>
                Correo Electrónico:
              </label>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.icon} />
                <input
                  type="email"
                  placeholder="ejemplo@rutas.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={error ? styles.inputError : ""}
                  disabled={isLoading || showToast}
                />
              </div>
              {error && <span className={styles.errorText}>{error}</span>}
            </div>

            <button
              type="submit"
              className={styles.btnMain}
              disabled={isLoading || showToast}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                "SOLICITAR NUEVA CLAVE"
              )}
            </button>

            <button
              type="button"
              className={styles.btnBackRegister}
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              <ArrowLeft size={16} /> Regresar al inicio
            </button>

            <div className={styles.divider}>
              <span>O</span>
            </div>

            {/* BOTÓN VOLVER DINÁMICO */}
            <Link
              to={esProfesor ? "/login-profesor" : "/login"}
              className={styles.btnGoogle}
              style={{ textDecoration: "none" }}
            >
              <FaArrowLeft /> VOLVER AL LOGIN
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;