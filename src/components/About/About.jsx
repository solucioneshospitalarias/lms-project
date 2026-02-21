import React, { useState } from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEye, faUsers } from "@fortawesome/free-solid-svg-icons";
import techImg from "../../assets/quienesSomos.png";
import pngNiño from "../../assets/plataformaEducativa.png"
import pngNiña from "../../assets/plataformaAnalisis.png"
import portatil from "../../assets/portatil.png"
 
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
              <h2 style={{ fontSize:"45px", fontWeight: "bold"}}>Plataforma educativa</h2>
            </div>
            <div className={styles.tabDivider}></div>
            <div className={styles.mainDescription}>
              <p>
                Rutas del Saber es una plataforma educativa integral que conecta a la comunidad educativa y facilita el acceso a herramientas, contenidos y proyectos para impulsar la formación, la seguridad y el desarrollo social.
              </p>

              <p> • Acceder a contenidos educativos estructurados y actualizados.</p>

              <p> • Implementar proyectos pedagógicos enfocados en la transformación social.</p>

              <p> • Fortalecer la convivencia escolar y la cultura de paz.</p>

              <p> • Promover la sostenibilidad ambiental y la conciencia ciudadana.</p>

              <p> • Prevenir la violencia y fomentar el respeto por los Derechos Humanos.</p>

              <p> • Desarrollar competencias en Educación Vial y autocuidado</p>

            </div>
            <p style={{ marginTop: "20px", fontWeight: "bold", fontSize:"20px" }}>Para acceder en la plataforma educativa dale click al boton que aparece abajo.</p>
            <button className={styles.tabActionBtn}>Ingresar a mi plataforma</button>
          </div>
          <div className={styles.imgSection}>
            <img src={pngNiño} alt="PlataformaEducativa" className={styles.imgNiño} />
          </div>
        </div>
      )}

      {activeTab === "analisis" && (
        <div className={styles.analyticsContainer}>
          <div className={styles.analyticsContent}>
            <div className={styles.tabHeader}>
              <h2 style={{ fontSize:"45px", fontWeight: "bold"}}>Plataforma Analisis</h2>
            </div>
            <div className={styles.tabDivider}></div>
            <div className={styles.mainDescription}>
              <p>
                Rutas del Saber es una plataforma educativa integral que conecta a la comunidad educativa y facilita el acceso a herramientas, contenidos y proyectos para impulsar la formación, la seguridad y el desarrollo social.
              </p>

              <p> • Acceder a contenidos educativos estructurados y actualizados.</p>

              <p> • Implementar proyectos pedagógicos enfocados en la transformación social.</p>

              <p> • Fortalecer la convivencia escolar y la cultura de paz.</p>

              <p> • Promover la sostenibilidad ambiental y la conciencia ciudadana.</p>

              <p> • Prevenir la violencia y fomentar el respeto por los Derechos Humanos.</p>

              <p> • Desarrollar competencias en Educación Vial y autocuidado</p>

            </div>
            <p style={{ marginTop: "20px", fontWeight: "bold", fontSize:"20px" }}>Para acceder en la plataforma educativa dale click al boton que aparece abajo.</p>
            <button className={styles.tabActionBtnAnalisis}>Ingresar a mi plataforma</button>
          </div>
          <div className={styles.imgSection}>
            <img src={pngNiña} alt="PlataformaAnalisis" className={styles.imgNiña} />
          </div>
        </div>
      )}
      <div className={styles.educacionContainer}>
        <h3> Impulsando la educación 4.0 para los retos del mañana. </h3>
        <img src={portatil} alt="Portatil" className={styles.portatil} />
      </div>
    </section>
  );
};

export default About;
