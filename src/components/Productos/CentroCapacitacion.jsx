import React, { useState, useEffect, useRef } from 'react';
import styles from './CentroCapacitacion.module.css';
import { FaGraduationCap, FaChalkboardTeacher, FaCertificate, FaRocket } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';

const CountUpItem = ({ end, label, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [hasStarted, end]);

    return (
        <div className={styles.statItem} ref={elementRef}>
            <strong>{prefix}{count}{suffix}</strong>
            <p>{label}</p>
        </div>
    );
};

const CentroCapacitacion = () => {
    // Función para el disparo de confeti y notificación profesional
    const handleInscribirse = (cursoTitle) => {

        // ESTO HACE PARA QUE MANDE A LA PESTAÑA DE AULA-VIRTUAL CUANDO SE PRESIONE "INICIAR MODULO"
        // setTimeout(() => {
        //     // Aquí es donde sucede la magia:
        //     window.location.href = "/aula-virtual"; // O la URL que tú quieras
        // }, 4000);


        // 1. Notificación Toast adaptativa
        toast.success(`¡Inscripción exitosa a ${cursoTitle}!`, {
            duration: 4000,
            position: 'bottom-center',
            style: {
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                border: '1px solid var(--primary-red)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600'
            },
            iconTheme: {
                primary: 'var(--primary-red)',
                secondary: '#fff',
            },
        });

        // 2. Efecto de Confeti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const cursos = [
        { id: 1, icon: <FaRocket />, title: "Seguridad Vial Inicial", desc: "Fundamentos para docentes de transición y primaria.", duracion: "20 Horas", nivel: "Básico" },
        { id: 2, icon: <FaChalkboardTeacher />, title: "Estrategias Lúdicas", desc: "Cómo enseñar leyes de tránsito mediante el juego.", duracion: "15 Horas", nivel: "Intermedio" },
        { id: 3, icon: <FaCertificate />, title: "Certificación Líder Vial", desc: "Diplomado avanzado en gestión de riesgos escolares.", duracion: "40 Horas", nivel: "Avanzado" }
    ];

    return (
        <section className={styles.trainingSection}>
            {/* Componente que renderiza los mensajes flotantes */}
            <Toaster />

            <div className={styles.glassHeader}>
                <FaGraduationCap className={styles.mainIcon} />
                <h2>Centro de Capacitación Profesional</h2>
                <p>Potencia tus habilidades con nuestras rutas de aprendizaje certificadas</p>
            </div>

            <div className={styles.gridCapacitacion}>
                {cursos.map((curso) => (
                    <div key={curso.id} className={styles.courseCard}>
                        <div className={styles.iconWrapper}>{curso.icon}</div>
                        <h3>{curso.title}</h3>
                        <p>{curso.desc}</p>
                        <div className={styles.cardFooter}>
                            <span>{curso.duracion}</span>
                            <span className={styles.badge}>{curso.nivel}</span>
                        </div>
                        <button
                            className={styles.btnInscribirse}
                            onClick={() => handleInscribirse(curso.title)}
                        >
                            Iniciar Módulo
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.statsBanner}>
                <CountUpItem end={500} label="Docentes" prefix="+" />
                <CountUpItem end={100} label="Virtual" suffix="%" />
                <CountUpItem end={2026} label="Certificado Oficial" />
            </div>
        </section>
    );
};

export default CentroCapacitacion;