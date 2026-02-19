import React, { useState } from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEye, faUsers } from "@fortawesome/free-solid-svg-icons";
import techImg from "../../assets/quienesSomos.png";

const About = () => {
  // Estado para el efecto paralaje del contenedor principal
  const [mainRotation, setMainRotation] = useState({ x: 0, y: 0 });
  // Estado para el efecto paralaje de las cards individuales
  const [cardRotations, setCardRotations] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // Manejador genérico de movimiento para el efecto 3D
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

  const cards = [
    {
      title: "Nuestra Misión",
      text: "En Rutas del Saber, entendemos que la educación de niños y adolescentes no ocurren en el vacío. Somos una Organización calificada que articula comunidades, instituciones y actores sociales para responder al reto de una crianza segura y una formación integral.",
      icon: faRocket,
      color: "#F54748",
    },
    {
      title: "Visión",
      text: "Para el año 2030, Rutas del Saber se consolidará como ecosistema digital y pedagógico líder en Colombia para la transformación social. Habremos logrado articular a más de 1.000 comunidades educativas integrando seguridad vial y cultura de paz.",
      icon: faEye,
      color: "#47a0f5",
    },
    {
      title: "Valores",
      text: "Compromiso con la innovación educativa, integridad en nuestros procesos pedagógicos y responsabilidad social con cada comunidad del Atlántico para generar un impacto real.",
      icon: faUsers,
      color: "#47f5a0",
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
              Somos una solución tecnológica integral diseñada para transformar la educación
              en los municipios del Atlántico, mediante una plataforma web interactiva de vanguardia.
              Este ecosistema digital ofrece un acceso personalizado anual para cada estudiante y docente.
            </p>
            <div className={styles.buttonContainer}>
              <button className={styles.platformBtn}>PLATAFORMA PARA COLEGIOS</button>
            </div>
          </div>
        </div>
      </div>

      {/* GRILLA DE TARJETAS CON EFECTO GLOW DINÁMICO */}
      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.card3D}
            onMouseMove={(e) => handleCardMouseMove(e, index)}
            onMouseLeave={() => resetCardRotation(index)}
            style={{
              transform: `rotateX(${cardRotations[index].x}deg) rotateY(${cardRotations[index].y}deg)`,
              color: card.color, // Usado por currentColor en el CSS para el Glow
              borderTop: `5px solid ${card.color}`
            }}
          >
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={card.icon} size="3x" />
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <div className={styles.innerGlow} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;