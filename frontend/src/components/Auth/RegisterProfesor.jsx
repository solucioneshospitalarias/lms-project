import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Users,
  User,
  Eye,
  EyeOff,
  ChevronLeft,
  ShieldCheck,
  Calendar,
  Settings,
  School,
  Phone,
  BookOpen,
} from "lucide-react";
import styles from "./RegisterProfesor.module.css";

const RegisterProfesor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Estados independientes para visibilidad de contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado inicial con todos los campos de la base de datos
  const [formData, setFormData] = useState({
    numDoc: "",
    tipoDoc: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    email: "",
    fechaNacimiento: "",
    fechaExpedicion: "",
    telefono: "",
    especialidad: "",
    password: "",
    confirmPassword: "",
    estadoAcceso: "ACTIVO", // Valor predeterminado según ENUM
    idColegio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleBack = () => navigate("/login", { replace: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validación de contraseñas iguales
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validación masiva de campos obligatorios (excepto apellido2)
    Object.keys(formData).forEach((key) => {
      if (!formData[key].toString().trim()) {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("Datos del profesor enviados:", formData);
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
          Inicia tu proceso de validación para unirte a la plataforma.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Fila: Documento y Tipo */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Número de Documento:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={20} />
                <input
                  type="text"
                  name="numDoc"
                  placeholder="Número"
                  value={formData.numDoc}
                  onChange={handleChange}
                  className={errors.numDoc ? styles.inputError : ""}
                />
              </div>
              {errors.numDoc && (
                <span className={styles.errorMessage}>{errors.numDoc}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Tipo de Documento:</label>
              <div className={styles.inputWrapper}>
                <ShieldCheck className={styles.inputIcon} size={20} />
                <select
                  name="tipoDoc"
                  value={formData.tipoDoc}
                  onChange={handleChange}
                  className={errors.tipoDoc ? styles.inputError : ""}
                >
                  <option value="">Opción</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                </select>
              </div>
              {errors.tipoDoc && (
                <span className={styles.errorMessage}>{errors.tipoDoc}</span>
              )}
            </div>
          </div>

          {/* Campo: Nombres */}
          <div className={styles.inputGroup}>
            <label>Nombres:</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                type="text"
                name="nombre"
                placeholder="Tus Nombres"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? styles.inputError : ""}
              />
            </div>
            {errors.nombre && (
              <span className={styles.errorMessage}>{errors.nombre}</span>
            )}
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
                  placeholder="Apellido 1"
                  value={formData.apellido1}
                  onChange={handleChange}
                  className={errors.apellido1 ? styles.inputError : ""}
                />
              </div>
              {errors.apellido1 && (
                <span className={styles.errorMessage}>{errors.apellido1}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>Segundo Apellido:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={20} />
                <input
                  type="text"
                  name="apellido2"
                  placeholder="Apellido 2"
                  value={formData.apellido2}
                  onChange={handleChange}
                  className={errors.apellido2 ? styles.inputError : ""}
                />
              </div>
              {errors.apellido2 && (
                <span className={styles.errorMessage}>{errors.apellido2}</span>
              )}
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
                className={errors.email ? styles.inputError : ""}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Fila: Fechas */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Fecha de Nacimiento:</label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.inputIcon} size={20} />
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className={errors.fechaNacimiento ? styles.inputError : ""}
                />
              </div>
              {errors.fechaNacimiento && (
                <span className={styles.errorMessage}>
                  {errors.fechaNacimiento}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>Fecha de Expedición:</label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.inputIcon} size={20} />
                <input
                  type="date"
                  name="fechaExpedicion"
                  value={formData.fechaExpedicion}
                  onChange={handleChange}
                  className={errors.fechaExpedicion ? styles.inputError : ""}
                />
              </div>
              {errors.fechaExpedicion && (
                <span className={styles.errorMessage}>
                  {errors.fechaExpedicion}
                </span>
              )}
            </div>
          </div>

          {/* CAMPO DE ESPECIALIDAD DEL DOCENTE, ES OPCIONAL HASTA EL MOMENTO */}
          {/* <div className={styles.inputGroup}>
            <label>Especialidad Docente:</label>
            <div className={styles.inputWrapper}>
              <BookOpen className={styles.inputIcon} size={20} />
              <input
                type="text"
                name="especialidad"
                placeholder="Ej: Matemáticas, Ciencias"
                value={formData.especialidad}
                onChange={handleChange}
                className={errors.especialidad ? styles.inputError : ""}
              />
            </div>
            {errors.especialidad && (
              <span className={styles.errorMessage}>{errors.especialidad}</span>
            )}
          </div> */}

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
                className={`${styles.inputPhone} ${errors.telefono ? styles.inputError : ""}`}
              />
            </div>
            {errors.telefono && (
              <span className={styles.errorMessage}>{errors.telefono}</span>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div className={styles.inputGroup}>
            <label>Contraseña:</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Crea una contraseña"
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
                className={errors.confirmPassword ? styles.inputError : ""}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button type="submit" className={styles.btnMain} disabled={isLoading}>
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                Solicitar Cuenta Docente
              </>
            )}
          </button>
        </form>

        <div className={styles.footerText}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login-profesor" replace>
            Inicia sesión
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
