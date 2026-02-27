import React from 'react';
import styles from './Innovacion.module.css';
import { FaRocket } from 'react-icons/fa'; // Icono para el botón
import imgRegister from '../../assets/register.png'
import { Link } from 'react-router-dom'

const Innovacion = () => {
    return (
        <section className={styles.innovacionSection}>
            <div className={styles.container}>

                {/* Lado del Texto */}
                <div className={styles.textContent}>
                    <span className={styles.badge}>PRÓXIMO NIVEL</span>
                    <h2 className={styles.title}>
                        REGÍSTRATE PARA ESTAR UN PASO ADELANTE EN <span className={styles.highlight}>INNOVACIÓN</span>
                    </h2>
                    <p className={styles.description}>
                        No solo enseñamos seguridad vial, diseñamos el futuro de la movilidad educativa.
                        Únete a la red de docentes más avanzada del Atlántico.
                    </p>
                    <Link to="/register" className={styles.btnInnovacion}>
                        UNIRME AHORA <FaRocket className={styles.icon} />
                    </Link>
                </div>

                {/* Lado de la Imagen */}
                <div className={styles.imageContainer}>
                    <div className={styles.glassCard}>
                        {/* Aquí insertas tu imagen vectorial de innovación */}
                        <img src={imgRegister} alt="Innovación" className={styles.mainImg} />
                    </div>
                    {/* Decoración: Círculos de luz de fondo */}
                    <div className={styles.glowEffect}></div>
                </div>

            </div>
        </section>
    );
};

export default Innovacion;