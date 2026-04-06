import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import styles from "./RestablecerContraseña.module.css";

const RestablecerContraseña = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isPasswordValid = newPassword.length >= 8;
  const canSubmit = isPasswordValid && passwordsMatch && currentPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({ type: "success", message: "¡Tu contraseña ha sido actualizada correctamente!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setStatus({ type: "error", message: "Error al actualizar la contraseña." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.containerPage}>
      <div className={styles.formCard}>
        {/* Cabecera integrada directamente en la tarjeta */}
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Tu contraseña"
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowNew(!showNew)}>
                {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {newPassword.length > 0 && !isPasswordValid && (
              <span className={styles.fieldError}>Mínimo 8 caracteres requeridos.</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar Nueva Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu nueva contraseña"
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
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