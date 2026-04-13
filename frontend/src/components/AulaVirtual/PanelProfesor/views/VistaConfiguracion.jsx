import React, { useState } from 'react';
import styles from './VistaConfiguracion.module.css';
import { Shield, BellRing, Globe, Palette, Smartphone, X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { changePassword } from '../../../../services/api';
import { toast } from 'react-hot-toast';

const VistaConfiguracion = () => {
    const [optimizando, setOptimizando] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const manejarGuardado = async (e) => {
        e.preventDefault(); // Usar submit del form es mejor

        if (!formData.current_password || !formData.new_password || !formData.confirm_password) {
            return toast.error("Todos los campos son obligatorios.");
        }
        if (formData.new_password !== formData.confirm_password) {
            return toast.error("Las nuevas contraseñas no coinciden.");
        }
        if (formData.new_password.length < 8) {
            return toast.error("La nueva contraseña debe tener al menos 8 caracteres.");
        }

        setIsLoading(true);
        try {
            const res = await changePassword(formData);
            setIsSuccess(true);
            toast.success(res.message || "¡Contraseña actualizada!");

            setTimeout(() => {
                setIsSuccess(false);
                setShowModal(false);
                setFormData({ current_password: '', new_password: '', confirm_password: '' });
            }, 2500);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : "Error al actualizar la contraseña.");
        } finally {
            setIsLoading(false);
        }
    };

    const manejarOptimizacion = () => {
        setOptimizando(true);
        setTimeout(() => {
            setOptimizando(false);
            toast.success("Panel optimizado correctamente");
        }, 2000);
    };

    return (
        <div className={styles.container}>
            {/* SECCIÓN: SEGURIDAD */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}><Shield size={20} /> Seguridad de la Cuenta</h3>
                <div className={styles.row}>
                    <div className={styles.info}>
                        <h4>Credenciales de Acceso</h4>
                        <p>Mantén tu cuenta protegida actualizando tu contraseña periódicamente.</p>
                    </div>
                    <button className={styles.btnAction} onClick={() => setShowModal(true)}>
                        Actualizar Contraseña
                    </button>
                </div>
                <div className={styles.divider} />
                <div className={styles.row}>
                    <div className={styles.info}>
                        <h4>Verificación en 2 pasos</h4>
                        <p>Añade una capa extra de seguridad vía WhatsApp.</p>
                    </div>
                    <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </section>

            {/* SECCIÓN: PERSONALIZACIÓN */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}><Palette size={20} /> Personalización y Sistema</h3>
                <div className={styles.row}>
                    <div className={styles.info}>
                        <h4><BellRing size={16} /> Notificaciones de WhatsApp</h4>
                        <p>Recibir reportes de entrega de guías en tu celular.</p>
                    </div>
                    <label className={styles.switch}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.slider}></span>
                    </label>
                </div>
                <div className={styles.row}>
                    <div className={styles.info}>
                        <h4><Globe size={16} /> Idioma del Panel</h4>
                        <p>Selecciona tu idioma de preferencia.</p>
                    </div>
                    <select className={styles.selectInput}>
                        <option>Español (CO)</option>
                        <option>English (US)</option>
                    </select>
                </div>
                <div className={styles.row}>
                    <div className={styles.info}>
                        <h4>Mantenimiento del Panel</h4>
                        <p>Limpiar datos temporales para mejorar la velocidad.</p>
                    </div>
                    <button className={styles.btnSecondary} onClick={manejarOptimizacion} disabled={optimizando}>
                        {optimizando ? <Loader2 className={styles.spin} size={18} /> : 'Optimizar Ahora'}
                    </button>
                </div>
            </section>

            {/* SECCIÓN: ALMACENAMIENTO */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}><Globe size={20} /> Almacenamiento de Guías</h3>
                <div className={styles.storageBarContainer}>
                    <div className={styles.storageInfo}>
                        <span>Espacio utilizado: 1.2 GB de 5 GB</span>
                        <span>24%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '24%' }}></div>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>Límite por archivo</label>
                        <select className={styles.selectInput}>
                            <option>5 MB (Recomendado)</option>
                            <option>10 MB</option>
                            <option>20 MB</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Formato preferido</label>
                        <select className={styles.selectInput}>
                            <option>Solo PDF</option>
                            <option>PDF e Imágenes</option>
                            <option>Cualquier formato</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* SOPORTE */}
            <section className={styles.sectionSupport}>
                <div className={styles.supportContent}>
                    <div className={styles.info}>
                        <h4>¿Necesitas ayuda técnica?</h4>
                        <p>Contacta directamente con el desarrollador vía WhatsApp.</p>
                    </div>
                    <a href="https://wa.me/000000000" target="_blank" rel="noopener noreferrer" className={styles.btnWhatsapp}>
                        <Smartphone size={18} /> Contactar Soporte
                    </a>
                </div>
            </section>

            {/* MODAL */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={() => !isLoading && setShowModal(false)}>
                            <X size={20} />
                        </button>

                        {!isSuccess ? (
                            <>
                                <div className={styles.modalHeader}>
                                    <h3>Cambiar Contraseña</h3>
                                    <p>Ingresa tus datos para actualizar la seguridad.</p>
                                </div>

                                <form className={styles.modalBody} onSubmit={manejarGuardado}>
                                    <div className={styles.field}>
                                        <label>Contraseña Actual</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={showPasswords.current ? "text" : "password"}
                                                name="current_password"
                                                value={formData.current_password}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Ingresa tu contraseña actual"
                                                required
                                            />
                                            <button type="button" className={styles.eyeBtn} onClick={() => togglePasswordVisibility('current')}>
                                                {showPasswords.current ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.field}>
                                        <label>Nueva Contraseña</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={showPasswords.new ? "text" : "password"}
                                                name="new_password"
                                                value={formData.new_password}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Mínimo 8 caracteres"
                                                required
                                            />
                                            <button type="button" className={styles.eyeBtn} onClick={() => togglePasswordVisibility('new')}>
                                                {showPasswords.new ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.field}>
                                        <label>Confirmar Nueva Contraseña</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={showPasswords.confirm ? "text" : "password"}
                                                name="confirm_password"
                                                value={formData.confirm_password}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Repite tu nueva contraseña"
                                                required
                                            />
                                            <button type="button" className={styles.eyeBtn} onClick={() => togglePasswordVisibility('confirm')}>
                                                {showPasswords.confirm ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button type="submit" className={styles.btnConfirm} disabled={isLoading}>
                                        {isLoading ? <Loader2 className={styles.spin} size={20} /> : 'Guardar Cambios'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className={styles.successContainer}>
                                <div className={styles.successIcon}>✓</div>
                                <h4>¡Cambio Exitoso!</h4>
                                <p>Tu seguridad ha sido actualizada correctamente.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VistaConfiguracion;
