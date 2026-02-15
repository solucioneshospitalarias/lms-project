import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEye, faUsers } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const cards = [
    {
      title: "Nuestra Misión",
      text: "En Rutas del Saber, entendemos que la educación de niños y adolescentes no ocurren en el vacío. Somos una Organización calificada que articula comunidades, instituciones y actores sociales para responder al reto de una crianza segura y una formación integral. No lo hacemos solos: creamos el puente entre la teoría pedagógica y la práctica social.",
      icon: faRocket,
      color: "#F54748",
    },
    {
      title: "Visión",
      text: "Para el año 2030, Rutas del Saber se consolidará como ecosistema digital y pedagógico líder en Colombia para la transformación social. Habremos logrado articular a más de 1.000 comunidades educativas, integrando de manera efectiva la seguridad vial, la conciencia ambiental, convivencia escolar y la cultura de paz en el ADN de las nuevas generaciones. Seguiremos siendo el referente principal en la creacion de territorios inteligentes y seguros, donde cada niño y adolescente crezca con las herramientas necesarias para liderar una sociedad mas justa, sostenible y profundamente humana.",
      icon: faEye,
      color: "#47a0f5",
    },
    {
      title: "Valores",
      text: "Falta la informacion del instructor",
      icon: faUsers,
      color: "#47f5a0",
    },
  ];

  return (
    <section id="mision" className={styles.aboutContainer}>
      <h2 className={styles.mainTitle}>¿Quiénes Somos?</h2>
      <div className={styles.underline}></div>

      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card3D}>
            <div className={styles.content}>
              <div className={styles.iconWrapper} style={{ color: card.color }}>
                <FontAwesomeIcon icon={card.icon} size="3x" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
