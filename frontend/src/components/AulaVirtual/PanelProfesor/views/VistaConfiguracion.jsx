import React, { useState } from 'react';
import styles from './VistaConfiguracion.module.css';
import { Shield, BellRing, Globe, Palette, Smartphone, X } from 'lucide-react';

const VistaConfiguracion = () => {
    const [optimizando, setOptimizando] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const manejarGuardado = () => {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            setShowModal(false);
        }, 2000);
    };

    const manejarOptimizacion = () => {
        setOptimizando(true);
        setTimeout(() => {
            setOptimizando(false);
            alert("Panel optimizado correctamente");
        }, 2000);
    };

    return (
        <div className={styles.container}>

            {/* SECCIÓN: SEGURIDAD */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}><Shield size={20} /> Seguridad de la Cuenta</h3>

                <div className={styles.row} style={{ marginBottom: '1.5rem' }}>
                    <div className={styles.info}>
                        <h4>Credenciales de Acceso</h4>
                        <p>Mantén tu cuenta protegida actualizando tu contraseña periódicamente.</p>
                    </div>
                    <button
                        className={styles.btnAction}
                        onClick={() => setShowModal(true)}
                    >
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
                    <select className={styles.input} style={{ width: '200px' }}>
                        <option>Español (CO)</option>
                        <option>English (US)</option>
                    </select>
                </div>

                <div className={styles.row}>
                    <div className={styles.info}>
                        <h4>Mantenimiento del Panel</h4>
                        <p>Limpiar datos temporales para mejorar la velocidad de carga.</p>
                    </div>
                    <button
                        className={styles.btnSecondary}
                        onClick={manejarOptimizacion}
                        disabled={optimizando}
                    >
                        {optimizando ? 'Optimizando...' : 'Optimizar Ahora'}
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

                <div className={styles.grid} style={{ marginTop: '1.5rem' }}>
                    <div className={styles.field}>
                        <label>Límite por archivo</label>
                        <select className={styles.input}>
                            <option>5 MB (Recomendado)</option>
                            <option>10 MB</option>
                            <option>20 MB</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Formato preferido</label>
                        <select className={styles.input}>
                            <option>Solo PDF</option>
                            <option>PDF e Imágenes</option>
                            <option>Cualquier formato</option>
                        </select>
                    </div>
                </div>
            </section>

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

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                            <X size={20} />
                        </button>

                        {!isSuccess ? (
                            <>
                                <div className={styles.modalHeader}>
                                    <h3>Cambiar Contraseña</h3>
                                    <p>Ingresa tus datos para actualizar la seguridad.</p>
                                </div>

                                <div className={styles.modalBody}>
                                    <div className={styles.field}>
                                        <label>Contraseña Actual</label>
                                        <input type="password" className={styles.input} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Nueva Contraseña</label>
                                        <input type="password" className={styles.input} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Confirmar Nueva Contraseña</label>
                                        <input type="password" className={styles.input} />
                                    </div>
                                    <button className={styles.btnConfirm} onClick={manejarGuardado}>
                                        Guardar Cambios
                                    </button>
                                </div>
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