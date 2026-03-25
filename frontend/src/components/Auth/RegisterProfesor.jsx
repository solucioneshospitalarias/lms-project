import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Users, User, Eye, EyeOff, ChevronLeft, ShieldCheck, Calendar, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./RegisterProfesor.module.css";
import { registrarProfesor } from "../../services/api.js";
import confetti from "canvas-confetti";

const RegisterProfesor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Estados independientes para visibilidad de contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado inicial con todos los campos
  const [formData, setFormData] = useState({
    numDoc: "",
    tipoDoc: "",
    nombres: "",
    apellido1: "",
    apellido2: "",
    email: "",
    fechaNacimiento: "",
    fechaExpedicion: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    aceptar_terminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setApiError("");
  };

  const handleBack = () => navigate("/login", { replace: true });

  // Función para disparar el confeti
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

    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // VALIDACIONES FRONT
    if (!formData.numDoc.trim()) {
      newErrors.numDoc = "El número de documento es obligatorio";
    }
    if (!formData.tipoDoc) {
      newErrors.tipoDoc = "Debe seleccionar el tipo de documento";
    }
    if (!formData.nombres.trim()) {
      newErrors.nombres = "Los nombres son obligatorios";
    }
    if (!formData.apellido1.trim()) {
      newErrors.apellido1 = "El primer apellido es obligatorio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    }
    if (!formData.fechaExpedicion) {
      newErrors.fechaExpedicion = "La fecha de expedición es obligatoria";
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!formData.aceptar_terminos) {
      newErrors.aceptar_terminos = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const registroData = {
        email: formData.email,
        password: formData.password,
        confirmar_password: formData.confirmPassword,
        tipo_doc: formData.tipoDoc,
        num_documento: formData.numDoc,
        nombres: formData.nombres,
        apellido1: formData.apellido1,
        apellido2: formData.apellido2 || "",
        fecha_nacimiento: formData.fechaNacimiento,
        fecha_expedicion: formData.fechaExpedicion,
        telefono: formData.telefono,
        aceptar_terminos: formData.aceptar_terminos,
      };

      const response = await registrarProfesor(registroData);

      if (response.user) {
        localStorage.setItem("userData", JSON.stringify(response.user));
      }

      setIsLoading(false);
      setIsSuccess(true);
      triggerConfetti();

      setTimeout(() => {
        navigate("/panel-profesor", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error en registro profesor:", error);
      setIsLoading(false);

      const data = error.response?.data;

      if (!data) {
        setApiError("Error inesperado del servidor");
        return;
      }

      // 🔒 PASSWORD (cuando viene como campo)
      if (data.password) {
        setErrors((prev) => ({
          ...prev,
          password: Array.isArray(data.password) ? data.password.join(", ") : data.password,
        }));
        return;
      }

      // 🔒 PASSWORD (cuando viene como non_field_errors)
      if (data.non_field_errors) {
        setErrors((prev) => ({
          ...prev,
          password: data.non_field_errors.join(", "),
        }));
        return;
      }

      // 📧 EMAIL
      if (data.email) {
        setErrors((prev) => ({
          ...prev,
          email: Array.isArray(data.email) ? data.email[0] : data.email,
        }));
        return;
      }

      // 🆔 DOCUMENTO
      if (data.num_documento) {
        setErrors((prev) => ({
          ...prev,
          numDoc: Array.isArray(data.num_documento) ? data.num_documento[0] : data.num_documento,
        }));
        return;
      }

      // 📋 PADRÓN
      if (data.padron) {
        setApiError(Array.isArray(data.padron) ? data.padron[0] : data.padron);
        return;
      }

      // ⚠️ ERROR GENERAL BACKEND
      if (data.error) {
        setApiError(data.error);
        return;
      }

      // 💀 fallback
      setApiError("Verifica los datos.");
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

      {/* --- CONTENEDOR DE ÉXITO (OVERLAY) --- */}
      {isSuccess && (
        <div className={styles.successOverlay}>
          <div className={`${styles.successCard} fadeUpEffect`}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={40} className={styles.successCheck} />
            </div>
            <h3>¡Registro Exitoso!</h3>
            <p>Bienvenido al equipo docente</p>
          </div>
        </div>
      )}

      <div className={`${styles.registerCard} fadeUpEffect`}>
        <div className={styles.iconHeader}>
          <Users size={32} color="white" />
        </div>

        <h2>Solicitud de Registro Docente</h2>
        <p className={styles.subtitle}>Inicia tu proceso de validación para unirte a la plataforma.</p>

        {/* Banner de error de la API */}
        {apiError && (
          <div className={styles.apiErrorBanner}>
            <AlertCircle size={20} />
            <p>{apiError}</p>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Fila: Documento y Tipo */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Tipo de Documento:</label>
              <div className={styles.inputWrapper}>
                <ShieldCheck className={styles.inputIcon} size={20} />
                <select name="tipoDoc" value={formData.tipoDoc} onChange={handleChange} disabled={isLoading} className={errors.tipoDoc ? styles.inputError : ""}>
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PAS">Pasaporte</option>
                </select>
              </div>
              {errors.tipoDoc && <span className={styles.errorMessage}>{errors.tipoDoc}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Número de Documento:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={20} />
                <input type="text" name="numDoc" placeholder="Ej: 9876543210" value={formData.numDoc} onChange={handleChange} disabled={isLoading} className={errors.numDoc ? styles.inputError : ""} />
              </div>
              {errors.numDoc && <span className={styles.errorMessage}>{errors.numDoc}</span>}
            </div>
          </div>

          {/* Campo: Nombres */}
          <div className={styles.inputGroup}>
            <label>Nombres:</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input type="text" name="nombres" placeholder="Tus nombres" value={formData.nombres} onChange={handleChange} disabled={isLoading} className={errors.nombres ? styles.inputError : ""} />
            </div>
            {errors.nombres && <span className={styles.errorMessage}>{errors.nombres}</span>}
          </div>

          {/* Fila: Apellidos */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Primer Apellido:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={20} />
                <input
                  type="text"
                  name="apellido1"
                  placeholder="Primer apellido"
                  value={formData.apellido1}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.apellido1 ? styles.inputError : ""}
                />
              </div>
              {errors.apellido1 && <span className={styles.errorMessage}>{errors.apellido1}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label>Segundo Apellido (opcional):</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={20} />
                <input
                  type="text"
                  name="apellido2"
                  placeholder="Segundo apellido"
                  value={formData.apellido2}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.apellido2 ? styles.inputError : ""}
                />
              </div>
              {errors.apellido2 && <span className={styles.errorMessage}>{errors.apellido2}</span>}
            </div>
          </div>

          {/* Fila: Correo */}
          <div className={styles.inputGroup}>
            <label>Correo Electrónico:</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                name="email"
                placeholder="correo@docente.edu.co"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.email ? styles.inputError : ""}
              />
            </div>
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          {/* Fila: Fechas */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Fecha de Nacimiento:</label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.inputIcon} size={20} />
                <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} disabled={isLoading} className={errors.fechaNacimiento ? styles.inputError : ""} />
              </div>
              {errors.fechaNacimiento && <span className={styles.errorMessage}>{errors.fechaNacimiento}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label>Fecha de Expedición:</label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.inputIcon} size={20} />
                <input type="date" name="fechaExpedicion" value={formData.fechaExpedicion} onChange={handleChange} disabled={isLoading} className={errors.fechaExpedicion ? styles.inputError : ""} />
              </div>
              {errors.fechaExpedicion && <span className={styles.errorMessage}>{errors.fechaExpedicion}</span>}
            </div>
          </div>

          {/* Fila: Teléfono */}
          <div className={styles.inputGroup}>
            <label>Teléfono:</label>
            <div className={styles.inputWrapper}>
              <div className={styles.phonePrefix}>
                <img src="https://flagcdn.com/w20/co.png" alt="CO" />
                <span>+57</span>
              </div>
              <input
                type="tel"
                name="telefono"
                placeholder="300 123 4567"
                value={formData.telefono}
                onChange={handleChange}
                disabled={isLoading}
                className={`${styles.inputPhone} ${errors.telefono ? styles.inputError : ""}`}
              />
            </div>
            {errors.telefono && <span className={styles.errorMessage}>{errors.telefono}</span>}
          </div>

          {/* Campo: Contraseña */}
          <div className={styles.inputGroup}>
            <label>Contraseña:</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.password ? styles.inputError : ""}
              />
              <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          {/* Campo: Confirmar Contraseña */}
          <div className={styles.inputGroup}>
            <label>Confirmar Contraseña:</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.confirmPassword ? styles.inputError : ""}
              />
              <button type="button" className={styles.eyeButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
          </div>

          {/* Términos y condiciones */}
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" name="aceptar_terminos" checked={formData.aceptar_terminos} onChange={handleChange} disabled={isLoading} />
            <label>
              Acepto los{" "}
              <Link to="/terminos" target="_blank">
                términos y condiciones
              </Link>
            </label>
          </div>
          {errors.aceptar_terminos && <span className={styles.errorMessage}>{errors.aceptar_terminos}</span>}

          <button type="submit" className={styles.btnMain} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className={styles.spinner} size={20} />
                Registrando...
              </>
            ) : (
              "Solicitar Cuenta Docente"
            )}
          </button>

          <button type="button" className={styles.btnBackRegister} onClick={() => navigate("/")} disabled={isLoading}>
            <ArrowLeft size={16} /> Regresar al inicio
          </button>
        </form>

        <div className={styles.footerText}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login-profesor" replace>
            Inicia sesión
          </Link>
        </div>

        <button className={styles.backButton} onClick={handleBack} disabled={isLoading}>
          <ChevronLeft size={16} /> Volver al acceso alumnos
        </button>
      </div>
    </div>
  );
};

export default RegisterProfesor;
