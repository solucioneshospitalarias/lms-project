import React, { useState } from 'react';
import styles from './Servicios.module.css';
import imgServicios from "../../assets/Servicios.png";
import { Link } from 'react-router-dom';

const Servicios = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        // Calculamos el centro del contenedor
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;

        // Inclinación máxima de 10 grados para un efecto sutil
        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;

        setRotation({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 }); // Volver a la posición original
    };

    return (
        <div className={styles.mainWrapper}>
            <section
                className={styles.container3D}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
            >
                <div className={styles.gridContent}>
                    <div className={styles.imageArea}>
                        <div className={styles.imgCard}>
                            <img
                                src={imgServicios}
                                alt="Componentes Rutas"
                                className={styles.mainImg}
                            />
                            <div className={styles.imgReflection}></div>
                        </div>
                    </div>

                    <div className={styles.textArea}>
                        <span className={styles.topBadge}>SERVICIOS</span>
                        <h2 className={styles.mainTitle}>
                            COMPONENTES <span className={styles.redText}>RUTAS</span>
                        </h2>
                        <div className={styles.redLine}></div>
                        <p className={styles.desc}>
                            Nuestra plataforma integra múltiples componentes y miles de recursos interactivos
                            que hacen de esta la solución más completa para la formación de estudiantes
                            en el departamento del Atlántico.
                        </p>
                        <Link
                            to="/productos#seccion-componentes"
                            className={styles.btn3D}
                        >
                            CONOCER MÁS
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Servicios;