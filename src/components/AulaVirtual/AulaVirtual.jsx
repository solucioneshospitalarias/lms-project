import React from 'react';
import styles from './AulaVirtual.module.css';
import { ListChecks, CircleCheck, MessagesSquare, Computer, ChartLine } from "lucide-react"
import lmsMockup from "../../assets/Aula.png";

const AulaVirtual = () => {
    const features = [
        { icon: ListChecks, text: "Gestión de Tareas y Actividades" },
        { icon: CircleCheck, text: "Evaluaciones Interactivas" },
        { icon: MessagesSquare, text: "Foros y Debates Virtuales" },
        { icon: Computer, text: "Sesiones de Clase en Vivo" },
        { icon: ChartLine, text: "Panel de Informes y Seguimiento" }
    ];

    return (
        <section className={styles.lmsSection}>
            <div className={styles.container}>
                <div className={styles.contentGrid}>

                    {/* LADO IZQUIERDO: VISUALIZACIÓN PROFESIONAL */}
                    <div className={styles.visualSide}>
                        <div className={styles.imageWrapper}>
                            <img src={lmsMockup} alt="LMS Dashboard" className={styles.mockupImg} />
                            {/* Elementos flotantes para dar profundidad */}
                            <div className={styles.floatingCard}>
                                <div className={styles.pulseDot}></div>
                                <span>Plataforma Activa</span>
                            </div>
                        </div>
                    </div>

                    {/* LADO DERECHO: INFORMACIÓN Y CARACTERÍSTICAS */}
                    <div className={styles.textSide}>
                        <div className={styles.header}>
                            <span className={styles.badge}>SISTEMA LMS</span>
                            <h2 className={styles.title}>AULA VIRTUAL <span className={styles.highlight}>INTELIGENTE</span></h2>
                            <p className={styles.description}>
                                El aula virtual es la columna vertebral del proceso de aprendizaje.
                                Un ecosistema diseñado para conectar a estudiantes, docentes y padres
                                con herramientas de comunicación de vanguardia.
                            </p>
                        </div>

                        <ul className={styles.featureList}>
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <li key={index} className={styles.featureItem}>
                                        <div className={styles.iconCircle}>
                                            <Icon icon={item.icon} />
                                        </div>
                                        <span>{item.text}</span>
                                    </li>
                                )
                            })}
                        </ul>

                        <button className={styles.mainBtn}>EXPLORAR LMS</button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AulaVirtual;