import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
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
  const [isSuccess, setIsSuccess] = useState(false); // ESTADO PARA EL CUADRO DE ÉXITO

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/";
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validaciones previas
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

    setErrors({ email: emailError, password: passwordError });

    // 2. Si no hay errores, iniciar proceso
    if (!emailError && !passwordError) {
      setIsLoading(true);

      // Guardar email si "Recordarme" está activo
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      // Simulación de respuesta del servidor
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);

        // 2. DISPARAR EL CONFETI ALEGRE Y PROFESIONAL
        // Configuramos una explosión lateral profesional pero festiva
        const duration = 2 * 1000; // 2 segundos de confeti
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 10000,
        }; // Z-Index alto para estar sobre el overlay

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          // Disparos desde las esquinas inferiores
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

        // Redirigir después de 2 segundos para que se vea el mensaje
        setTimeout(() => {
          navigate("/aula-virtual");
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* --- CONTENEDOR DE ÉXITO (OVERLAY) --- */}
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
          <button
            className={styles.btnBackHeader}
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} /> Regresar al inicio
          </button>
          <div className={styles.cardGlow}></div>

          <div className={styles.header}>
            <h2>Bienvenido</h2>
            <p>Ingresa a tu cuenta para continuar.</p>
          </div>

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
                />
              </div>
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
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
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <div className={styles.options}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
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
              disabled={isLoading || isSuccess} // Deshabilitar si está cargando o ya entró
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  Iniciar Sesión
                </>
              )}
            </button>

            <p className={styles.footerText}>
              ¿Listo para potenciar tu futuro? <Link to="/register">Regístrate ahora</Link>
            </p>
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

          <div className={styles.profesorAccess}>
            <p className={styles.dividerText}>
              ¿Eres parte del equipo docente?
            </p>
            <button
              type="button"
              className={styles.btnProfesor}
              onClick={() => navigate("/login-profesor")}
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
