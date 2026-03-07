import React, { useState, useEffect, useRef } from "react";
import styles from "./CentroCapacitacion.module.css";
import confetti from "canvas-confetti";
import toast, { Toaster } from "react-hot-toast";

const CountUpItem = ({ end, label, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.1 },
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end]);

  return (
    <div className={styles.statItem} ref={elementRef}>
      <strong>
        {prefix}
        {count.toLocaleString("es-CO")}
        {suffix}
      </strong>
      <p>{label}</p>
    </div>
  );
};

const CentroCapacitacion = () => {
  const handleInscribirse = (cursoTitle) => {
    toast.success(`¡Inscripción exitosa a ${cursoTitle}!`, {
      duration: 4000,
      position: "bottom-center",
      style: {
        background: "var(--card-bg)",
        color: "var(--text-main)",
        border: "1px solid var(--primary-red)",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "600",
      },
      iconTheme: {
        primary: "var(--primary-red)",
        secondary: "#fff",
      },
    });

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const cursos = [
    {
      id: 1,
      // Icono colorido de semáforo con nubes (más alegre)
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/2855/2855648.png"
          alt="Icono Vial"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ),
      title: "Educación Vial",
      desc: "Respeta señales y normas para evitar accidentes en vías.",
      duracion: "80 Horas",
      nivel: "Básico",
    },
    {
      id: 2,
      // Icono colorido de manos entrelazadas formando un corazón con paz (más alegre)
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3843/3843236.png"
          alt="Icono Paz"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ),
      title: "Cultura de Paz",
      desc: "Practica respeto, diálogo y tolerancia para vivir en paz.",
      duracion: "80 Horas",
      nivel: "Intermedio",
    },
    {
      id: 3,
      // Icono colorido de una planta creciendo en una mano verde (más alegre)
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/11186/11186716.png"
          alt="Icono Ambiental"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ),
      title: "Educación Ambiental",
      desc: "Cuida la naturaleza, recicla y protege nuestro planeta siempre.",
      duracion: "120 Horas",
      nivel: "Avanzado",
    },
    {
      id: 4,
      // Icono colorido de niños abrazados y sonriendo (más alegre)
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1000/1000389.png"
          alt="Icono Convivencia"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ),
      title: "Convivencia Escolar",
      desc: "Respeta a todos y convive en armonía escolar.",
      duracion: "100 Horas",
      nivel: "Intermedio",
    },
  ];

  return (
    <section className={styles.trainingSection}>
      <Toaster />

      <div className={styles.glassHeader}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
          alt="Capacitación"
          className={styles.mainIcon}
          style={{ width: "60px", marginBottom: "15px" }}
        />
        <h2>Centro de Capacitación Profesional</h2>
        <p>
          Potencia tus habilidades con nuestras rutas de aprendizaje
          certificadas
        </p>
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
        <div className={styles.statsRow}>
          <CountUpItem end={1103} label="Municipios" prefix="+" />
        </div>
        <div className={styles.statsRow}>
          <CountUpItem end={19652} label="Colegios" suffix="%" />
        </div>
        <div className={styles.statsRow}>
          <CountUpItem end={324092} label="Docentes" />
        </div>
        <div className={styles.statsRow}>
          <CountUpItem end={10941357} label="Alumnos" />
        </div>
      </div>
    </section>
  );
};

export default CentroCapacitacion;
