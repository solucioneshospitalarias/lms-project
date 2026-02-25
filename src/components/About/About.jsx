import React, { useState } from "react";
import styles from "./About.module.css";
import { RocketIcon, Eye, Users, Youtube } from "lucide-react"
import img from "../../assets/favicon.ico";
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
      icon: RocketIcon,
      iconColor: missionVisionColor,
      iconClass: "missionVisionIcon", // Clase unificada para misión y visión
    },
    {
      title: "Visión",
      text: "Para el año 2030, Rutas del Saber se consolidará como ecosistema digital y pedagógico líder en Colombia para la transformación social. Habremos logrado articular a más de 1.000 comunidades educativas integrando seguridad vial y cultura de paz.",
      icon: Eye,
      iconColor: missionVisionColor, // Mismo color que misión
      iconClass: "missionVisionIcon", // Misma clase que misión
    },
    {
      title: "Valores",
      text: "Compromiso con la innovación educativa, integridad en nuestros procesos pedagógicos y responsabilidad social con cada comunidad del Atlántico para generar un impacto real.",
      icon: Users,
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
              <img src={img} alt="Innovación" className={styles.mainImg} />
              <div className={styles.floatingBadge}>Atlántico Digital</div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.title3D}>¿QUIÉNES SOMOS?</h2>
            <div className={styles.divider}></div>
            <p className={styles.mainText}>
              En Rutas del Saber, somos una plataforma líder dedicada a transformar
              la educación vial y la convivencia armónica a través de la tecnología. Creemos que el
              conocimiento es la herramienta más poderosa para salvar vidas y construir una cultura
              de paz en nuestras comunidades.
            </p>
            <div className={styles.buttonContainer}>
              <button className={styles.platformBtn}>PLATAFORMA PARA COLEGIOS</button>
            </div>
          </div>
        </div>
      </div>

      {/* GRILLA DE TARJETAS */}
      <div className={styles.cardsGrid}>
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
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
                <Icon size={48} className={`${styles.cardIcon} ${styles[card.iconClass]}`} color={card.iconColor} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
              <div className={styles.innerGlow} />
            </div>
          )
        })}
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
              <h2 style={{ fontSize: "45px", fontWeight: "bold" }}>Plataforma Educativa</h2>
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
            <p style={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}>Para acceder en la plataforma educativa dale click al boton que aparece abajo.</p>
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
              <h2 style={{ fontSize: "45px", fontWeight: "bold" }}>Plataforma Análisis</h2>
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
            <p style={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}>Para acceder en la plataforma educativa dale click al boton que aparece abajo.</p>
            <button className={styles.tabActionBtnAnalisis}>Ingresar a mi plataforma</button>
          </div>
          <div className={styles.imgSection}>
            <img src={pngNiña} alt="PlataformaAnalisis" className={styles.imgNiña} />
          </div>
        </div>
      )}
      <div className={styles.educacionContainer}>
        <h3>Impulsando la educación 4.0 para los retos del mañana.</h3>
        <div className={styles.portatilWrapper}>
          <img src={portatil} alt="Portatil" className={styles.portatil} />
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      <div className={`${styles.youtubeSection} fadeUpEffect`}>
        <div className={styles.youtubeCard}>
          <div className={styles.youtubeInfo}>
            <div className={styles.youtubeBadge}>
              <Youtube className={styles.ytIcon} size={20} />
              <span>CONTENIDO EXCLUSIVO</span>
            </div>
            <h2 className={styles.ytTitle}>Nuestro Canal de <span>YouTube</span></h2>
            <p className={styles.ytText}>
              Suscríbete para acceder a tutoriales, conferencias y material educativo
              exclusivo sobre seguridad vial y cultura de paz en el Atlántico.
            </p>
            <a
              href="https://www.youtube.com/channel/UC8vs2Auh70OOSJ0rkcR_rPg"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subscribeBtn}
            >
              Suscribirse ahora
            </a>
          </div>

          <div className={styles.videoWrapper}>
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&loop=1&playlist=dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className={styles.videoDecoration}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
