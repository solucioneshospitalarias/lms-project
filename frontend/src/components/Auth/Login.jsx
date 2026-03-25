import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { login } from "../../services/api.js";
import { Mail, Lock, ArrowRight, Chrome, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import Img1 from "../../assets/Item1.png";
import Img2 from "../../assets/Item2.png";
import Img3 from "../../assets/Item3.png";
import Img4 from "../../assets/Item4.png";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
      if (savedPassword) {
        setPassword(savedPassword);
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 10000,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      );
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({ email: "", password: "" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailError = "";
    let passwordError = "";

    if (!email.trim()) {
      emailError = "Este campo es obligatorio";
    } else if (!emailRegex.test(email)) {
      emailError = "Formato de correo inválido (ejemplo@rutas.com)";
    }

    if (!password.trim()) {
      passwordError = "Este campo es obligatorio";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password);

      console.log("Login exitoso:", response);

      if (response.user) {
        localStorage.setItem("userData", JSON.stringify(response.user));
      }

      if (rememberMe) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");
      }

      setIsLoading(false);
      setIsSuccess(true);
      triggerConfetti();

      setTimeout(() => {
        if (response.user.user_type === "profesor") {
          navigate("/dashboard-profesor");
        } else if (response.user.user_type === "alumno") {
          navigate("/aula-virtual");
        } else {
          navigate("/dashboard");
        }
      }, 2000);

    } catch (error) {
      console.error("Error completo en login:", error);
      setIsLoading(false);

      const serverData = error.response?.data; // Accedemos a la data de Axios
      
      let newErrors = { email: "", password: "" };
      let newApiError = "";

      if (serverData) {
        // 1. Capturar errores generales (El banner rojo que ya tienes)
        if (serverData.non_field_errors) {
          newApiError = Array.isArray(serverData.non_field_errors) 
            ? serverData.non_field_errors[0] 
            : serverData.non_field_errors;
        } 
        
        // 2. Capturar errores de campos específicos (opcional, por si el backend cambia)
        if (serverData.password) {
          newErrors.password = Array.isArray(serverData.password) ? serverData.password[0] : serverData.password;
        }
        if (serverData.email) {
          newErrors.email = Array.isArray(serverData.email) ? serverData.email[0] : serverData.email;
        }

        // 3. Si no hay mensajes de texto pero hay un error_type, podrías personalizarlo
        if (!newApiError && serverData.error_type?.includes("email_not_found")) {
          newApiError = "El correo electrónico no está registrado.";
        }
      } else {
        newApiError = "Ocurrió un error inesperado. Inténtalo más tarde.";
      }

      setErrors(newErrors);
      setApiError(newApiError); // Esto actualizará el banner rojo en tu componente
    }
  };

  return (
    <div className={styles.loginPage}>
      {isSuccess && (
        <div className={styles.successOverlay}>
          <div className={`${styles.successCard} fadeUpEffect`}>
            <div className={styles.successIconWrapper}>
              <ArrowRight size={40} className={styles.successArrow} />
            </div>
            <h3>Sesión Iniciada</h3>
            <p>Bienvenido de nuevo a Rutas del Saber</p>
          </div>
        </div>
      )}

      <div className={styles.mainWrapper}>
        <div className={styles.infoSection}>
          <div className={styles.floatingDecorations}>
            <img src={Img1} className={`${styles.floatItem} ${styles.item1}`} alt="decoracion" />
            <img src={Img2} className={`${styles.floatItem} ${styles.item2}`} alt="decoracion" />
            <img src={Img3} className={`${styles.floatItem} ${styles.item3}`} alt="decoracion" />
            <img src={Img4} className={`${styles.floatItem} ${styles.item4}`} alt="decoracion" />
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
          <button className={styles.btnBackHeader} onClick={() => navigate("/")}>
            <ArrowLeft size={16} /> Regresar
          </button>
          <div className={styles.cardGlow}></div>

          <div className={styles.header}>
            <h2>Bienvenido</h2>
            <p>Ingresa a tu cuenta para continuar.</p>
          </div>

          {apiError && (
            <div className={styles.apiErrorBanner}>
              <p>{apiError}</p>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Correo Electrónico:</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.icon} size={16} />
                <input
                  type="email"
                  placeholder="ejemplo@rutas.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? styles.inputError : ""}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Contraseña:</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? styles.inputError : ""}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

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

            <button
              type="submit"
              className={styles.btnMain}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? <span className={styles.spinner}></span> : "Iniciar Sesión"}
            </button>

            <p className={styles.footerText}>
              ¿Listo para potenciar tu futuro? <Link to="/register">Regístrate ahora</Link>
            </p>
          </form>

          <div className={styles.divider}>
            <span></span>
          </div>

          <div className={styles.profesorAccess}>
            <p className={styles.dividerText}>¿Eres parte del equipo docente?</p>
            <button
              type="button"
              className={styles.btnProfesor}
              onClick={() => navigate("/login-profesor")}
              disabled={isLoading}
            >
              Ingresar como Profesor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;