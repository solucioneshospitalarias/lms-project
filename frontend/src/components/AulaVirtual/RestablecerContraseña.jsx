import React, { useState } from "react";
import { changePassword } from "../../services/api";
import { toast } from 'react-hot-toast';
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import styles from "./RestablecerContraseña.module.css";

const RestablecerContraseña = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = formData.new_password === formData.confirm_password && formData.new_password.length > 0;
  const isPasswordValid = formData.new_password.length >= 8;
  const canSubmit = isPasswordValid && passwordsMatch && formData.current_password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ type: "", message: "" });

    if (formData.new_password !== formData.confirm_password) {
      const errorMsg = "La nueva contraseña y la confirmación no coinciden.";
      setStatus({ type: "error", message: errorMsg });
      return toast.error(errorMsg);
    }

    setIsLoading(true);

    try {
      const response = await changePassword(formData);

      setStatus({ type: "success", message: response.message });
      toast.success(response.message || "Contraseña actualizada correctamente");

      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (error) {
      console.error("Error al cambiar contraseña:", error);

      const errorDetail = Array.isArray(error) ? error[0] :
        (typeof error === "string" ? error : "Error al procesar la solicitud");

      setStatus({ type: "error", message: errorDetail });
      toast.error(errorDetail);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.containerPage}>
      <div className={styles.formCard}>
        <div className={styles.headerSection}>
          <div className={styles.iconContainer}>
            <Lock size={28} color="white" />
          </div>
          <h1 className={styles.titlePage}>Restablecer Contraseña</h1>
          <p className={styles.subtitlePage}>
            Por seguridad, ingresa tu contraseña actual antes de crear una nueva.
          </p>
        </div>

        {status.message && (
          <div className={`${styles.statusMessage} ${styles[status.type]}`}>
            {status.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Contraseña Actual</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showCurrent ? "text" : "password"}
                name="current_password"
                placeholder="Tu contraseña actual"
                value={formData.current_password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowCurrent(!showCurrent)}>
                {showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.inputGroup}>
            <label>Nueva Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showNew ? "text" : "password"}
                name="new_password"
                placeholder="Mínimo 8 caracteres"
                value={formData.new_password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowNew(!showNew)}>
                {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {formData.new_password.length > 0 && !isPasswordValid && (
              <span className={styles.fieldError}>Mínimo 8 caracteres requeridos.</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar Nueva Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                placeholder="Repite tu nueva contraseña"
                value={formData.confirm_password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {formData.confirm_password.length > 0 && !passwordsMatch && (
              <span className={styles.fieldError}>Las contraseñas no coinciden.</span>
            )}
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={!canSubmit || isLoading}>
            {isLoading ? <span className={styles.loader} /> : "Actualizar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestablecerContraseña;