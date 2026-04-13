import React from 'react';
import { BookOpen, Lightbulb, Target, ChevronDown, Info } from 'lucide-react';
import { LifeBuoy } from 'lucide-react';
import styles from './VistaPanelPrincipal.module.css';
import capiImg from '../../../../assets/favicon.ico';
import academicSeal from '../../../../assets/register.png';

const VistaPanelPrincipal = ({ setActiveTab }) => {
    const handleSupport = () => {
        const phoneNumber = "1234567890";
        const message = encodeURIComponent(
            "¡Hola! 👋 Soy docente en la plataforma Rutas del Saber y necesito asistencia técnica o pedagógica. Quedo atento a su ayuda."
        );

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className={styles.container}>
            <div className={styles.welcomeCard}>
                <div className={styles.welcomeHero}>
                    <div className={styles.textContent}>
                        <span className={styles.category}>ÁREA DOCENTE</span>
                        <h1 className={styles.title}>Bienvenido a su Gestión de Excelencia</h1>
                        <p className={styles.description}>
                            Su visión docente es la brújula de este ecosistema. En este centro de mando,
                            la gestión se convierte en arte: optimice sus procesos, potencie el talento
                            de sus grupos y lidere con la excelencia transformadora que define su vocación.
                        </p>
                        <div className={styles.actions}>
                            <button
                                className={styles.btnPrimary}
                                onClick={() => setActiveTab('grupos')}
                            >
                                Ver mis grupos
                            </button>

                            <button
                                className={styles.btnSecondary}
                                onClick={() => {
                                    window.scrollTo({ top: 600, behavior: 'smooth' });
                                }}
                            >
                                Guía de Gestión
                            </button>
                        </div>
                    </div>
                    <div className={styles.imageContent}>
                        <img src={capiImg} alt="El Capi" className={styles.mascot} />
                    </div>
                </div>
                {/* Ahora el aviso SI llegará abajo de todo el contenido */}
                <div className={styles.miniNotice}>
                    <div className={styles.noticeIcon}>
                        <Info size={16} />
                    </div>
                    <span>Instrucciones y metodologías disponibles debajo</span>
                    <ChevronDown size={14} className={styles.bounceIcon} />
                </div>
            </div>
            <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                    <div className={styles.iconWrapper}>
                        <BookOpen size={20} />
                    </div>
                    <h3 className={styles.cardTitle}>Instrucciones de Gestión</h3>
                    <p className={styles.cardText}>
                        Utilice los módulos laterales para un control total sobre el progreso académico.
                        Mantenga sus cursos actualizados para garantizar un flujo de aprendizaje óptimo.
                    </p>
                </div>
                {/* Tarjeta de Sugerencias */}
                <div className={styles.infoCard}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
                        <Lightbulb size={20} />
                    </div>
                    <h3 className={styles.cardTitle}>Sugerencias de Valor</h3>
                    <p className={styles.cardText}>
                        Implemente retroalimentación inmediata en las evaluaciones. Esto potencia el ciclo
                        de aprendizaje y fortalece el compromiso del estudiante con la materia.
                    </p>
                </div>
                {/* Tarjeta de Metodologías */}
                <div className={styles.infoCard}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                        <Target size={20} />
                    </div>
                    <h3 className={styles.cardTitle}>Metodologías Activas</h3>
                    <p className={styles.cardText}>
                        Considere el Aprendizaje Basado en Proyectos (ABP) para vincular conceptos
                        teóricos con soluciones reales, posicionando al alumno como centro del proceso.
                    </p>
                </div>
            </div>
            <section className={styles.inspiration}>
                <div className={styles.inspirationFlex}>
                    <blockquote className={styles.quote}>
                        <p>
                            "El éxito de un docente no se mide por lo que sabe, sino por lo que
                            sus alumnos logran alcanzar bajo su guía estratégica."
                        </p>
                        <footer className={styles.quoteFooter}>
                            — Paradigma de la Excelencia Académica
                        </footer>
                    </blockquote>
                    {/* Lado Derecho: El Sello Profesional */}
                    <div className={styles.sealSide}>
                        <img src={academicSeal} alt="Sello Institucional" className={styles.sideSeal} />
                    </div>
                </div>
            </section>
            <footer className={styles.supportArea}>
                <div className={styles.supportWrapper}>
                    <div className={styles.supportInfo}>
                        <LifeBuoy size={20} className={styles.helpIcon} />
                        <p>
                            ¿Necesita asistencia técnica? Nuestro equipo pedagógico está a un clic de distancia.
                        </p>
                    </div>
                    <button className={styles.supportAction} onClick={handleSupport}>
                        Contactar Soporte
                    </button>
                </div>

                <div className={styles.footerBrand}>
                    <p>© 2026 Rutas del Saber · Gestión de Excelencia Educativa</p>
                </div>
            </footer>
        </div>
    );
};

export default VistaPanelPrincipal;
