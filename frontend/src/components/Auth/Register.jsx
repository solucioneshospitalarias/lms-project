import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import {
  User,
  Mail,
  Lock,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Chrome,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [departamentoSel, setDepartamentoSel] = useState("");

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newErrors = {};

    // Validaciones de todos los campos
    if (!data.documento) newErrors.documento = "Este campo es obligatorio";
    if (!data.tipoDocumento)
      newErrors.tipoDocumento = "Este campo es obligatorio";
    if (!data.nombres) newErrors.nombres = "Este campo es obligatorio";
    if (!data.apellido1) newErrors.apellido1 = "Este campo es obligatorio";
    if (!data.apellido2) newErrors.apellido2 = "Este campo es obligatorio";
    if (!data.departamento)
      newErrors.departamento = "Este campo es obligatorio";
    if (!data.municipio) newErrors.municipio = "Este campo es obligatorio";
    if (!data.email) newErrors.email = "Este campo es obligatorio";
    if (!data.fechaNacimiento)
      newErrors.fechaNacimiento = "Este campo es obligatorio";
    if (!data.fechaExpedicion)
      newErrors.fechaExpedicion = "Este campo es obligatorio";
    if (!data.telefono) newErrors.telefono = "Este campo es obligatorio";
    if (!data.password) newErrors.password = "Este campo es obligatorio";

    if (!data.confirmPassword) {
      newErrors.confirm = "Este campo es obligatorio";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirm = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Registro exitoso:", data);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/";
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.cardGlow}></div>

        <div className={styles.header}>
          <h2>
            Crear <span>Cuenta</span>
          </h2>
          <p>Únete a Rutas del Saber y comienza tu aprendizaje.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Fila: Documento y Tipo */}
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label>Número de Documento:</label>
              <div className={styles.inputWrapper}>
                <User className={styles.icon} size={18} />
                <input
                  name="documento"
                  type="text"
                  placeholder="Número"
                  className={errors.documento ? styles.inputError : ""}
                />
              </div>
              {errors.documento && (
                <span className={styles.errorText}>{errors.documento}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Tipo de Documento:</label>
              <div className={styles.inputWrapper}>
                <ShieldCheck className={styles.icon} size={18} />
                <select
                  name="tipoDocumento"
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
                  className={`${styles.selectInput} ${errors.departamento ? styles.inputError : ""}`}
                  onChange={(e) => setDepartamentoSel(e.target.value)}
                  value={departamentoSel}
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
                  className={`${styles.selectInput} ${errors.municipio ? styles.inputError : ""}`}
                  disabled={!departamentoSel}
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
                {/* Prefijo con bandera y +57 */}
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
                  placeholder="Contraseña"
                  className={errors.password ? styles.inputError : ""}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* LÓGICA SOLICITADA: showPassword es true (mensaje visible) -> Ojo Abierto */}
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
                  placeholder="Repetir"
                  className={errors.confirm ? styles.inputError : ""}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* LÓGICA SOLICITADA: showConfirmPassword es true -> Ojo Abierto */}
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

          <button type="submit" className={styles.btnMain}>
            Registrarse
          </button>

          <button
            type="button"
            className={styles.btnBackRegister}
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} /> Regresar al inicio
          </button>
        </form>

        <div className={styles.divider}>
          <span>O regístrate con</span>
        </div>

        <button
          type="button"
          className={styles.btnGoogle}
          onClick={handleGoogleLogin}
        >
          <Chrome size={20} /> Google
        </button>

        <p className={styles.footerText}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
