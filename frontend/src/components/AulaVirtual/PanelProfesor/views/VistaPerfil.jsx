import React, { useState, useRef } from 'react';
import styles from './VistaPerfil.module.css';
import { Camera, Edit2, CheckCircle } from 'lucide-react';
import { useUser } from '../../../../context/UserContext';

const VistaPerfil = () => {
    const { userData, updateUserData } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [tempNombre, setTempNombre] = useState(userData.nombre);
    const [tempFoto, setTempFoto] = useState(userData.foto);
    const [tempCorreo, setTempCorreo] = useState(userData.correo || "correo@institucion.edu");

    const fileInputRef = useRef(null);

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempFoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateUserData({
            nombre: tempNombre,
            foto: tempFoto,
            correo: tempCorreo
        });

        setIsEditing(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setTempNombre(userData.nombre);
        setTempFoto(userData.foto);
        setTempCorreo(userData.correo || "correo@institucion.edu");
        setIsEditing(false);
    }

    return (
        <div className={styles.container}>
            {/* --- TOAST --- */}
            <div className={`${styles.toast} ${showToast ? styles.toastShow : ''}`}>
                <CheckCircle size={18} />
                <span>Datos personales actualizados correctamente</span>
            </div>

            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.avatarContainer} onClick={() => fileInputRef.current.click()}>
                        {tempFoto ? (
                            <img src={tempFoto} alt="Perfil" className={styles.avatar} style={{ objectFit: 'cover' }} />
                        ) : (
                            <div className={styles.avatar}>{userData.iniciales}</div>
                        )}
                        <div className={styles.avatarOverlay}>
                            <Camera size={20} />
                            <span>Cambiar Foto</span>
                        </div>
                        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFotoChange} />
                    </div>

                    <div>
                        <h2 style={{ margin: 0 }}>{isEditing ? tempNombre : userData.nombre}</h2>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>{userData.rol}</p>
                    </div>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.field}>
                        <label>Nombre de Cuenta</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={tempNombre}
                                onChange={(e) => setTempNombre(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <p className={styles.textStatic}>{userData.nombre}</p>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label>Correo Electrónico de Acceso</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={tempCorreo}
                                onChange={(e) => setTempCorreo(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <p className={styles.textStatic}>{userData.correo || "correo@institucion.edu"}</p>
                        )}
                    </div>

                    <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                        <label>Institución (No editable)</label>
                        <p className={styles.textStatic} style={{ color: '#94a3b8' }}>
                            {userData.institucion || "Institución Educativa"}
                        </p>
                    </div>
                </div>

                <div className={styles.btnGroup}>
                    {!isEditing ? (
                        <button className={styles.btnSecondary} onClick={() => setIsEditing(true)}>
                            <Edit2 size={16} style={{ marginRight: '8px' }} /> Editar Mi Cuenta
                        </button>
                    ) : (
                        <>
                            <button className={styles.btnSecondary} onClick={handleCancel}>Cancelar</button>
                            <button className={styles.btnPrimary} onClick={handleSave}>Guardar Cambios</button>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.card}>
                <h4 style={{ marginTop: 0, marginBottom: '1rem', color: '#1e293b' }}>Biografía / Enfoque Educativo</h4>
                <div className={styles.field}>
                    <p style={{ color: '#1e293b', lineHeight: 1.6, margin: 0 }}>
                        Docente comprometido con la excelencia académica y el desarrollo integral de los estudiantes a través de metodologías innovadoras.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VistaPerfil;