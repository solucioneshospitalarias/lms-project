import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa"; // Añadimos FaCheckCircle
import styles from "./Login.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo válido");
      return;
    }

    setError("");
    setIsLoading(true);
    setShowToast(false);

    setTimeout(() => {
      setIsLoading(false); // Quitamos spinner
      setShowToast(true); // Mostramos aviso de éxito
      setEmail(""); // Limpiamos el input

      // El aviso se quita solo después de 4 segundos
      setTimeout(() => {
        setShowToast(false);
      }, 4000);

      console.log("Instrucciones enviadas a:", email);
    }, 2000);
  };

  return (
    <div className={styles.loginPage}>
      {/* --- NOTIFICACIÓN (TOAST) --- */}
      {showToast && (
        <div className={styles.toastNotification}>
          <FaCheckCircle className={styles.toastIcon} />
          <div className={styles.toastText}>
            <strong>¡Enviado!</strong>
            <span>Revisa tu bandeja de entrada</span>
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
              Recuperar <span>Clave</span>
            </h2>
            <p
              style={{
                color: "var(--primary-gray)",
                marginTop: "10px",
                fontSize: "0.9rem",
              }}
            >
              Introduce tu correo electrónico para enviarte las instrucciones de
              restablecimiento.
            </p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <label
                style={{
                  color: "var(--text-main)",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
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
                />
              </div>
              {error && <span className={styles.errorText}>{error}</span>}
            </div>

            <button
              type="submit"
              className={styles.btnMain}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                "ENVIAR INSTRUCCIONES"
              )}
            </button>

            <button
              type="button"
              className={styles.btnBackRegister}
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} /> Regresar al inicio
            </button>

            <div className={styles.divider}>
              <span>O</span>
            </div>

            <Link
              to="/login"
              className={styles.btnGoogle}
              replace={true}
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
