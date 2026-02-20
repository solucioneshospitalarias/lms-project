import React, { useState } from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEye, faUsers } from "@fortawesome/free-solid-svg-icons";
import techImg from "../../assets/quienesSomos.png";

const About = () => {
  const [activeTab, setActiveTab] = useState("escuelas");
  const [mainRotation, setMainRotation] = useState({ x: 0, y: 0 });

  const [cardRotations, setCardRotations] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const handleMouseMove = (e, setRotation, intensity = 10) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    const tiltX = (y - 0.5) * intensity;
    const tiltY = (x - 0.5) * -intensity;
    setRotation({ x: tiltX, y: tiltY });
  };

  const handleCardMouseMove = (e, index) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    const tiltX = (y - 0.5) * 15;
    const tiltY = (x - 0.5) * -15;

    const newRotations = [...cardRotations];
    newRotations[index] = { x: tiltX, y: tiltY };
    setCardRotations(newRotations);
  };

  const resetRotation = (setRotation) => setRotation({ x: 0, y: 0 });
  const resetCardRotation = (index) => {
    const newRotations = [...cardRotations];
    newRotations[index] = { x: 0, y: 0 };
    setCardRotations(newRotations);
  };

  // Color para Misión y Visión (mismo color rojo)
  const missionVisionColor = "#b31818";
  // Color para Valores (azul)
  const valuesColor = "#1260a8";

  const cards = [
    {
      title: "Nuestra Misión",
      text: "En Rutas del Saber, entendemos que la educación de niños y adolescentes no ocurren en el vacío. Somos una Organización calificada que articula comunidades, instituciones y actores sociales para responder al reto de una crianza segura y una formación integral.",
      icon: faRocket,
      iconColor: missionVisionColor,
      iconClass: "missionVisionIcon", // Clase unificada para misión y visión
    },
    {
      title: "Visión",
      text: "Para el año 2030, Rutas del Saber se consolidará como ecosistema digital y pedagógico líder en Colombia para la transformación social. Habremos logrado articular a más de 1.000 comunidades educativas integrando seguridad vial y cultura de paz.",
      icon: faEye,
      iconColor: missionVisionColor, // Mismo color que misión
      iconClass: "missionVisionIcon", // Misma clase que misión
    },
    {
      title: "Valores",
      text: "Compromiso con la innovación educativa, integridad en nuestros procesos pedagógicos y responsabilidad social con cada comunidad del Atlántico para generar un impacto real.",
      icon: faUsers,
      iconColor: valuesColor,
      iconClass: "valuesIcon",
    },
  ];

  return (
    <section className={styles.aboutPage}>
      <div className={styles.outerWrapper}>
        <div
          className={styles.whoWeAre3DCard}
          onMouseMove={(e) => handleMouseMove(e, setMainRotation)}
          onMouseLeave={() => resetRotation(setMainRotation)}
          style={{
            transform: `rotateX(${mainRotation.x}deg) rotateY(${mainRotation.y}deg)`,
          }}
        >
          <div className={styles.imageSection}>
            <div className={styles.imgContainer}>
              <img src={techImg} alt="Innovación" className={styles.mainImg} />
              <div className={styles.floatingBadge}>Atlántico Digital</div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.title3D}>¿QUIÉNES SOMOS?</h2>
            <div className={styles.divider}></div>
            <p className={styles.mainText}>
              Somos una solución tecnológica integral diseñada para transformar la educación en los municipios del Atlántico, mediante una plataforma web interactiva de vanguardia. Este ecosistema
              digital ofrece un acceso personalizado anual para cada estudiante y docente.
            </p>
            <div className={styles.buttonContainer}>
              <button className={styles.platformBtn}>PLATAFORMA PARA COLEGIOS</button>
            </div>
          </div>
        </div>
      </div>

      {/* GRILLA DE TARJETAS */}
      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.card3D}
            onMouseMove={(e) => handleCardMouseMove(e, index)}
            onMouseLeave={() => resetCardRotation(index)}
            style={{
              transform: `rotateX(${cardRotations[index].x}deg) rotateY(${cardRotations[index].y}deg)`,
              borderTop: `5px solid ${card.iconColor}`,
            }}
          >
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={card.icon} size="3x" className={`${styles.cardIcon} ${styles[card.iconClass]}`} style={{ color: card.iconColor }} />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardText}>{card.text}</p>
            <div className={styles.innerGlow} />
          </div>
        ))}
      </div>

      <div className={styles.tabcontainer}>
        <button className={`${styles.tabBtn} ${activeTab === "escuelas" ? styles.active : ""}`} onClick={() => setActiveTab("escuelas")}>
          Plataforma para escuelas
        </button>
        <button className={`${styles.tabBtn} ${activeTab === "analisis" ? styles.active : ""}`} onClick={() => setActiveTab("analisis")}>
          Plataforma de análisis
        </button>
      </div>

      {activeTab === "escuelas" && (
        <div className={styles.schoolsContainer}>
          <div className={styles.schoolsContent}>
            <div className={styles.tabHeader}>
              <h2># Trendi</h2>
              <h3>Trends & Innovation</h3>
            </div>

            <div className={styles.tabDivider}></div>

            <div className={styles.mainDescription}>
              <p>
                Proveemos herramientas para facilitar la interacción entre docentes, estudiantes, directivos y padres de familia. Posibilidad de asignar tareas, foros, chat, trabajo colaborativo y de
                realizar seguimiento detallado por estudiante.
              </p>
              <p style={{ marginTop: "20px" }}>Además contenido interactivo para cubrir el currículo en las diferentes áreas de conocimiento.</p>
            </div>

            <div className={styles.featuresSection}>
              <h4>CARACTERÍSTICAS PRINCIPALES</h4>
              <div className={styles.featuresGrid}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6.5L3 11.5L12 16.5L21 11.5L12 6.5Z" />
                    <path d="M3 11.5V17.5" />
                    <path d="M21 11.5V17.5" />
                  </svg>
                  <span>Gestión Académica</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Trabajo Colaborativo</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Foros y Chat</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>Seguimiento Detallado</span>
                </div>
              </div>
            </div>

            <div className={styles.contactSection}>
              <h4>CANALES DE SOPORTE</h4>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>HORARIO</span>
                  <span className={styles.contactValue}>L-V 7:00am a 5:00pm S 8:00am a 12:00m</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>EMAIL</span>
                  <span className={styles.contactValue}>info@trendigroup.com</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>WHATSAPP</span>
                  <span className={`${styles.contactValue} ${styles.highlight}`}>+57 320 788 7327</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>CELULAR</span>
                  <span className={`${styles.contactValue} ${styles.highlight}`}>+57 304 526 4078</span>
                </div>
              </div>
            </div>

            <button className={styles.tabActionBtn}>Ingresar a mi plataforma</button>
          </div>
        </div>
      )}

      {activeTab === "analisis" && (
        <div className={styles.analyticsContainer}>
          <div className={styles.analyticsContent}>
            {/* Icono opcional */}
            <div className={styles.analyticsIcon}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 17L8 12L12 16L18 10L21 13" stroke="var(--primary-red)" />
                <path d="M3 3V21H21" stroke="var(--primary-red)" />
                <circle cx="18" cy="6" r="2" stroke="var(--primary-red)" />
              </svg>
            </div>

            <h2>Plataforma de Análisis</h2>
            <p>Contenido específico para análisis de datos. Describe las herramientas analíticas, dashboards y capacidades de tu plataforma.</p>

            {/* Grid de características opcional */}
            <div className={styles.tabContentGrid}>
              <div className={styles.tabContentCard}>
                <h3>Dashboards</h3>
                <p>Visualización de datos en tiempo real</p>
              </div>
              <div className={styles.tabContentCard}>
                <h3>Métricas KPIs</h3>
                <p>Seguimiento de indicadores clave</p>
              </div>
              <div className={styles.tabContentCard}>
                <h3>Predicciones</h3>
                <p>Análisis predictivo avanzado</p>
              </div>
            </div>

            <button className={styles.tabContentBtn}>Saber más sobre análisis</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
