import React, { useState, useRef, useEffect } from "react";
import { User, ShieldCheck, Trash2, Camera, Edit2, X, Save, CheckCircle } from "lucide-react";
import styles from "./MiPerfil.module.css";
import img from '../../assets/favicon.ico'

const MiPerfil = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleCameraButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);

                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    const [formData, setFormData] = useState({
        nombreCompleto: "Walter",
        correo: "contactos@rutasdelsaber.com",
        telefono: "+57 000 000 000",
        ciudad: "Barranquilla, Atlántico"
    });

    const handleEditClick = () => setIsEditing(true);
    const handleCancelClick = () => setIsEditing(false);
    const handleSaveClick = () => {
        console.log("Datos actualizados");

        setIsEditing(false);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`${styles.container} fadeUpEffect`}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mi Perfil</h1>
                <p className={styles.subtitle}>
                    Gestiona tu identidad y seguridad en <span className={styles.brandResalt}>Rutas del Saber</span>.
                </p>
            </header>

            <div className={styles.mainContent}>
                <section className={`${styles.sectionCard} ${isEditing ? styles.editingMode : ""}`} style={{ position: 'relative' }}>

                    {showSuccess && (
                        <div className={styles.successAlert}>
                            <CheckCircle size={18} />
                            <span>Datos actualizados correctamente</span>
                        </div>
                    )}

                    <div className={styles.sectionHeader}>
                        <User size={20} className={styles.sectionIcon} />
                        <h2>Información Personal</h2>
                    </div>

                    <div className={styles.avatarContainer}>
                        <div className={styles.avatarWrapper}>
                            <img
                                src={avatarPreview || img}
                                alt="Avatar"
                                className={styles.avatar}
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            {isEditing && (
                                <button
                                    className={styles.editPhoto}
                                    onClick={handleCameraButtonClick}
                                    type="button"
                                    title="Cambiar foto de perfil"
                                >
                                    <Camera size={14} />
                                </button>
                            )}
                        </div>
                        <div className={styles.avatarText}>
                            <h3>{formData.nombreCompleto}</h3>
                            <p>Estudiante verificado</p>
                        </div>
                    </div>

                    <div className={styles.inputGrid}>
                        <div className={styles.field}>
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                placeholder="Walter"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                placeholder="contactos@rutasdelsaber.com"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                placeholder="+57 000 000 000"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Ciudad</label>
                            <input
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                placeholder="Barranquilla, Atlántico"
                            />
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        {isEditing ? (
                            <>
                                <button className={styles.btnSecondary} onClick={() => setIsEditing(false)}>
                                    <X size={16} /> Cancelar
                                </button>
                                <button className={styles.btnPrimary} onClick={handleSaveClick}>
                                    <Save size={16} /> Guardar Cambios
                                </button>
                            </>
                        ) : (
                            <button className={styles.btnPrimary} onClick={() => setIsEditing(true)}>
                                <Edit2 size={16} /> Editar Cuenta
                            </button>
                        )}
                    </div>
                </section>

                <section className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <ShieldCheck size={20} className={styles.sectionIcon} />
                        <h2>Ajustes de Cuenta</h2>
                    </div>

                    <div className={styles.accountSettings}>
                        <div className={styles.settingItem}>
                            <div>
                                <h4>Estado de la cuenta</h4>
                                <p>Tu cuenta está activa y protegida.</p>
                            </div>
                            <span className={styles.badgeActive}>Activa</span>
                        </div>

                        <div className={`${styles.settingItem} ${styles.dangerZone}`}>
                            <div>
                                <h4>Eliminar cuenta</h4>
                                <p>Esta acción es permanente y borrará tu progreso.</p>
                            </div>
                            <button className={styles.btnDanger}>
                                <Trash2 size={16} /> Eliminar
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MiPerfil;