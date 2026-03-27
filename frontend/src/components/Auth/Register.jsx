import React, { useState, useEffect } from "react";
import { registrarAlumno } from "../../services/api.js";
import styles from "./Login.module.css";
import {
  User, Mail, Lock, Calendar, MapPin, ShieldCheck, ArrowLeft,
  Chrome, Eye, EyeOff, Loader2, CheckCircle, AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [departamentoSel, setDepartamentoSel] = useState("");

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Datos del formulario
  const [formData, setFormData] = useState({
    documento: "",
    tipoDocumento: "",
    nombres: "",
    apellido1: "",
    apellido2: "",
    departamento: "",
    municipio: "",
    email: "",
    fechaNacimiento: "",
    fechaExpedicion: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    aceptar_terminos: false
  });

  const datosColombia = {
    Atlántico: ["Barranquilla", "Soledad", "Puerto Colombia"],
    Antioquia: ["Medellín", "Envigado", "Itagüí"],
    Bogotá: ["Bogotá D.C."],
    Valle: ["Cali", "Palmira", "Buenaventura"],
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setApiError("");

    // Actualizar departamento seleccionado
    if (name === "departamento") {
      setDepartamentoSel(value);
      setFormData(prev => ({ ...prev, municipio: "" })); // Limpiar municipio
    }
  };

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

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Registro completo con validación integrada
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones de todos los campos
    if (!formData.documento.trim()) {
      newErrors.documento = "El número de documento es obligatorio";
    }
    if (!formData.tipoDocumento) {
      newErrors.tipoDocumento = "Debe seleccionar el tipo de documento";
    }
    if (!formData.nombres.trim()) newErrors.nombres = "Este campo es obligatorio";
    if (!formData.apellido1.trim()) newErrors.apellido1 = "Este campo es obligatorio";
    if (!formData.apellido2.trim()) newErrors.apellido2 = "Este campo es obligatorio";
    if (!formData.departamento) newErrors.departamento = "Este campo es obligatorio";
    if (!formData.municipio) newErrors.municipio = "Este campo es obligatorio";

    if (!formData.email.trim()) {
      newErrors.email = "Este campo es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato de correo inválido";
    }

    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Este campo es obligatorio";
    if (!formData.fechaExpedicion) newErrors.fechaExpedicion = "Este campo es obligatorio";
    if (!formData.telefono.trim()) newErrors.telefono = "Este campo es obligatorio";

    if (!formData.password) {
      newErrors.password = "Este campo es obligatorio";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)";
    }

    if (!formData.confirmPassword) {
      newErrors.confirm = "Este campo es obligatorio";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirm = "Las contraseñas no coinciden";
    }

    if (!formData.aceptar_terminos) {
      newErrors.aceptar_terminos = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      try {
        // Preparar datos para la API (incluye validación automática del padrón)
        const registroData = {
          email: formData.email,
          password: formData.password,
          confirmar_password: formData.confirmPassword,
          tipo_doc: formData.tipoDocumento,
          num_documento: formData.documento,
          nombre: formData.nombres,
          apellido1: formData.apellido1,
          apellido2: formData.apellido2,
          fecha_nacimiento: formData.fechaNacimiento,
          fecha_expedicion: formData.fechaExpedicion,
          departamento: formData.departamento,
          municipio: formData.municipio,
          telefono: formData.telefono,
          aceptar_terminos: formData.aceptar_terminos
        };

        const response = await registrarAlumno(registroData);

        console.log("Registro exitoso:", response);

        // Guardar datos del usuario
        if (response.user) {
          localStorage.setItem("userData", JSON.stringify(response.user));
        }

        // Mostrar éxito
        setIsLoading(false);
        setIsSuccess(true);

        // Disparar confeti
        triggerConfetti();

        // Redirigir al aula virtual
        setTimeout(() => {
          navigate("/aula-virtual", { replace: true });
        }, 2000);

      } catch (error) {
        console.error("Error en registro:", error);
        setIsLoading(false);

        // Manejar errores del backend
        if (error.detail) {
          setApiError(error.detail);
        } else if (error.email) {
          setErrors(prev => ({ ...prev, email: Array.isArray(error.email) ? error.email[0] : error.email }));
        } else if (error.num_documento) {
          setErrors(prev => ({ ...prev, documento: Array.isArray(error.num_documento) ? error.num_documento[0] : error.num_documento }));
        } else if (error.password) {
          setErrors(prev => ({ ...prev, password: Array.isArray(error.password) ? error.password[0] : error.password }));
        } else if (error.padron) {
          // Error específico de validación del padrón
          const errorMensaje = Array.isArray(error.padron) ? error.padron[0] : error.padron;
          setApiError(`Validación del padrón: ${errorMensaje}`);
        } else if (typeof error === 'string') {
          setApiError(error);
        } else {
          setApiError("Acceso restringido: Documento no autorizado en el sistema");
        }
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* --- CONTENEDOR DE ÉXITO (OVERLAY) --- */}
      {isSuccess && (
        <div className={styles.successOverlay}>
          <div className={`${styles.successCard} fadeUpEffect`}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={40} className={styles.successCheck} />
            </div>
            <h3>¡Registro Exitoso!</h3>
            <p>Bienvenido a Rutas del Saber</p>
          </div>
        </div>
      )}

      <div className={styles.loginCard}>
        <div className={styles.cardGlow}></div>

        <div className={styles.header}>
          <h2>
            Crear <span>Cuenta</span>
          </h2>
          <p>Únete a Rutas del Saber y comienza tu aprendizaje.</p>
        </div>

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
                <ShieldCheck className={styles.icon} size={18} />
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${styles.selectInput} ${errors.tipoDocumento ? styles.inputError : ""}`}
                >
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                </select>
              </div>
              {errors.tipoDocumento && (
                <span className={styles.errorText}>{errors.tipoDocumento}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Número de Documento:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.icon} size={18} />
                <input
                  name="documento"
                  type="text"
                  placeholder="Ej: 1234567890"
                  value={formData.documento}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.documento ? styles.inputError : ""}
                />
              </div>
              {errors.documento && (
                <span className={styles.errorText}>{errors.documento}</span>
              )}
            </div>
          </div>

          {/* Nombres */}
          <div className={styles.inputGroup}>
            <label>Nombres:</label>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={18} />
              <input
                name="nombres"
                type="text"
                placeholder="Tus nombres"
                value={formData.nombres}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.nombres ? styles.inputError : ""}
              />
            </div>
            {errors.nombres && (
              <span className={styles.errorText}>{errors.nombres}</span>
            )}
          </div>

          {/* Fila: Apellidos */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Primer Apellido:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.icon} size={18} />
                <input
                  name="apellido1"
                  type="text"
                  placeholder="Primer apellido"
                  value={formData.apellido1}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.apellido1 ? styles.inputError : ""}
                />
              </div>
              {errors.apellido1 && (
                <span className={styles.errorText}>{errors.apellido1}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Segundo Apellido:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.icon} size={18} />
                <input
                  name="apellido2"
                  type="text"
                  placeholder="Segundo apellido"
                  value={formData.apellido2}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.apellido2 ? styles.inputError : ""}
                />
              </div>
              {errors.apellido2 && (
                <span className={styles.errorText}>{errors.apellido2}</span>
              )}
            </div>
          </div>

          {/* Fila: Ubicación */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Departamento:</label>
              <div className={styles.inputWrapper}>
                <MapPin className={styles.icon} size={18} />
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${styles.selectInput} ${errors.departamento ? styles.inputError : ""}`}
                >
                  <option value="">Seleccione...</option>
                  {Object.keys(datosColombia).map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </div>
              {errors.departamento && (
                <span className={styles.errorText}>{errors.departamento}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Municipio:</label>
              <div className={styles.inputWrapper}>
                <MapPin className={styles.icon} size={18} />
                <select
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  disabled={isLoading || !departamentoSel}
                  className={`${styles.selectInput} ${errors.municipio ? styles.inputError : ""}`}
                >
                  <option value="">Seleccione...</option>
                  {departamentoSel &&
                    datosColombia[departamentoSel].map((mun) => (
                      <option key={mun} value={mun}>
                        {mun}
                      </option>
                    ))}
                </select>
              </div>
              {errors.municipio && (
                <span className={styles.errorText}>{errors.municipio}</span>
              )}
            </div>
          </div>

          {/* Correo */}
          <div className={styles.inputGroup}>
            <label>Correo Electrónico:</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.icon} size={18} />
              <input
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.email ? styles.inputError : ""}
              />
            </div>
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* Fila: Fechas y Teléfono */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Fecha de Nacimiento:</label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.icon} size={18} />
                <input
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${styles.dateInput} ${errors.fechaNacimiento ? styles.inputError : ""}`}
                />
              </div>
              {errors.fechaNacimiento && (
                <span className={styles.errorText}>
                  {errors.fechaNacimiento}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Fecha de Expedición:</label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.icon} size={18} />
                <input
                  name="fechaExpedicion"
                  type="date"
                  value={formData.fechaExpedicion}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${styles.dateInput} ${errors.fechaExpedicion ? styles.inputError : ""}`}
                />
              </div>
              {errors.fechaExpedicion && (
                <span className={styles.errorText}>
                  {errors.fechaExpedicion}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Teléfono:</label>
              <div className={styles.inputWrapper}>
                <div className={styles.phonePrefix}>
                  <img
                    src="https://flagcdn.com/w20/co.png"
                    alt="Colombia"
                    className={styles.flagIcon}
                  />
                  <span>+57</span>
                </div>
                <input
                  name="telefono"
                  type="tel"
                  placeholder="300 123 4567"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${styles.inputPhone} ${errors.telefono ? styles.inputError : ""}`}
                />
              </div>
              {errors.telefono && (
                <span className={styles.errorText}>{errors.telefono}</span>
              )}
            </div>
          </div>

          {/* Fila: Contraseñas */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Contraseña:</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
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
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Confirmar Contraseña:</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={18} />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repetir contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.confirm ? styles.inputError : ""}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
              {errors.confirm && (
                <span className={styles.errorText}>{errors.confirm}</span>
              )}
            </div>
          </div>

          {/* Términos y condiciones */}
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              name="aceptar_terminos"
              checked={formData.aceptar_terminos}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label>
              Acepto los <Link to="/terminos" target="_blank">términos y condiciones</Link>
            </label>
          </div>
          {errors.aceptar_terminos && (
            <span className={styles.errorText}>{errors.aceptar_terminos}</span>
          )}

          <button
            type="submit"
            className={styles.btnMain}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className={styles.spinner} size={20} />
                Registrando...
              </>
            ) : (
              "Registrarse"
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
        </form>

        <div className={styles.divider}>
          <span></span>
        </div>

        <p className={styles.footerText}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;