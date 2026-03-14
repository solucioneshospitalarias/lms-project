import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import { RocketIcon, Eye, Users, Youtube } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../../assets/favicon.ico";
import pngNiño from "../../assets/plataformaEducativa.png";
import pngNiña from "../../assets/plataformaAnalisis.png";
import portatil from "../../assets/portatil.png";

const About = () => {
  const navigate = useNavigate();

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Usamos un timeout corto para esperar a que el DOM esté listo
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
          // Calculamos la posición considerando un margen para que el Header no lo tape
          const yOffset = -210; // Ajusta este valor según la altura de tu Navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); // 100ms es suficiente para la mayoría de los casos

      return () => clearTimeout(timer);
    }
  }, [hash]);

  const handleLoginRedirect = () => {
    navigate("/login"); // Cambia '/login' por la ruta exacta de tu página de acceso
  };

  const [activeTab, setActiveTab] = useState("escuelas");
  const activeColor = activeTab === "escuelas" ? "#b31818" : "#f19419";
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
      id: "mision",
      title: "Nuestra Misión",
      text: "En Rutas del Saber, entendemos que la educación de niños y adolescentes no ocurren en el vacío. Somos una Organización calificada que articula comunidades, instituciones y actores sociales para responder al reto de una crianza segura y una formación integral.",
      icon: RocketIcon,
      iconColor: missionVisionColor,
      iconClass: "missionVisionIcon", // Clase unificada para misión y visión
    },
    {
      id: "vision",
      title: "Visión",
      text: "Para el año 2030, Rutas del Saber se consolidará como ecosistema digital y pedagógico líder en Colombia para la transformación social. Habremos logrado articular a más de 1.000 comunidades educativas integrando seguridad vial y cultura de paz.",
      icon: Eye,
      iconColor: missionVisionColor, // Mismo color que misión
      iconClass: "missionVisionIcon", // Misma clase que misión
    },
    {
      id: "valores",
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
            </div>
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.title3D}>¿QUIÉNES SOMOS?</h2>
            <div className={styles.divider}></div>
            <p className={styles.mainText}>
              soy leonel messi
            </p>
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
              id={card.id}
              className={styles.card3D}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => resetCardRotation(index)}
              style={{
                transform: `rotateX(${cardRotations[index].x}deg) rotateY(${cardRotations[index].y}deg)`,
                borderTop: `5px solid ${card.iconColor}`,
              }}
            >
              <div className={styles.iconWrapper}>
                <Icon
                  size={48}
                  className={`${styles.cardIcon} ${styles[card.iconClass]}`}
                  color={card.iconColor}
                />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
              <div className={styles.innerGlow} />
            </div>
          );
        })}
      </div>

      <div className={styles.educacionContenedorPadre}>
        <div className={styles.tabcontainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "escuelas" ? styles.active : ""}`}
            onClick={() => setActiveTab("escuelas")}
            style={{
              // Si está activo, pone el rojo de la marca, si no, transparente o gris
              backgroundColor: activeTab === "escuelas" ? "#b31818" : "transparent",
              color: activeTab === "escuelas" ? "white" : "#555"
            }}
          >
            Plataforma para escuelas
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "analisis" ? styles.active : ""}`}
            onClick={() => setActiveTab("analisis")}
            style={{
              // Si está activo, pone el naranja de análisis, si no, transparente
              backgroundColor: activeTab === "analisis" ? "#f19419" : "transparent",
              color: activeTab === "analisis" ? "white" : "#555"
            }}
          >
            Plataforma de análisis
          </button>
        </div>

        {activeTab === "escuelas" && (
          <div className={styles.schoolsContainer}>
            <div className={styles.schoolsContent}>
              <div className={styles.tabHeader}>
                <h2 style={{ fontSize: "45px", fontWeight: "bold" }}>
                  Plataforma Educativa
                </h2>
              </div>
              <div className={styles.tabDivider}></div>
              <div className={styles.mainDescription}>
                <p>
                  Rutas del Saber es una plataforma educativa integral diseñada
                  para conectar a la comunidad y potenciar el desarrollo social.
                  Su enfoque principal es transformar el entorno escolar y
                  ciudadano a través de herramientas pedagógicas modernas.
                </p>

                <p>
                  {" "}
                  • Formación y Pedagogía: Acceso a contenidos actualizados y
                  proyectos que impulsan el aprendizaje y la transformación
                  social.
                </p>

                <p>
                  {" "}
                  • Convivencia y Valores: Promueve una cultura de paz, el respeto
                  por los Derechos Humanos y la prevención de la violencia.
                </p>

                <p>
                  {" "}
                  • Ciudadanía Responsable: Fomenta la conciencia ambiental, la
                  educación vial y el autocuidado.
                </p>
              </div>
              <p
                style={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Para acceder en la plataforma educativa dale click al boton que
                aparece abajo.
              </p>
              <button
                className={styles.tabActionBtn}
                onClick={handleLoginRedirect}
              >
                Ingresar a mi plataforma
              </button>
            </div>
            <div className={styles.imgSection}>
              <img
                src={pngNiño}
                alt="PlataformaEducativa"
                className={styles.imgNiño}
              />
            </div>
          </div>
        )}

        {activeTab === "analisis" && (
          <div className={styles.analyticsContainer}>
            <div className={styles.analyticsContent}>
              <div className={styles.tabHeader}>
                <h2 style={{ fontSize: "45px", fontWeight: "bold" }}>
                  Plataforma Análisis
                </h2>
              </div>
              <div className={styles.tabDivider}></div>
              <div className={styles.mainDescription}>
                <p>
                  Rutas del Saber es un ecosistema digital diseñado para conectar
                  a la comunidad educativa con herramientas de formación integral.
                  Su objetivo es generar un impacto positivo en la sociedad
                  mediante el aprendizaje y la prevención.
                </p>

                <p>
                  {" "}
                  • Educación de calidad: Contenidos actualizados y proyectos de
                  transformación social.
                </p>

                <p>
                  {" "}
                  • Cultura y Valores: Fomento de la paz, los Derechos Humanos y
                  la convivencia escolar.
                </p>

                <p>
                  {" "}
                  • Responsabilidad Ciudadana: Formación en sostenibilidad
                  ambiental, seguridad vial y autocuidado.
                </p>
              </div>
              <p
                tabActionBtnAnalisis
                style={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Para acceder en la plataforma educativa dale click al boton que
                aparece abajo.
              </p>
              <button
                className={styles.tabActionBtnAnalisis}
                onClick={handleLoginRedirect}
              >
                Ingresar a mi plataforma
              </button>
            </div>
            <div className={styles.imgSection}>
              <img
                src={pngNiña}
                alt="PlataformaAnalisis"
                className={styles.imgNiña}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.educacionContainer}>
        <h2 className={styles.professionalTitle}>
          Impulsando la <span>Educación 4.0</span> para los retos del mañana
        </h2>

        <div className={styles.portatilWrapper}>
          <img src={portatil} alt="Portatil" className={styles.portatil} />

          <div className={styles.screenVideoContainer}>
            <iframe
              className={styles.screenVideo}
              src="https://www.youtube.com/embed/V6yMJATvpTU?autoplay=1&mute=1&loop=1&playlist=V6yMJATvpTU&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
              title="YouTube video player"
              frameBorder="0"
              scrolling="no"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
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
            <h2 className={styles.ytTitle}>
              Nuestro Canal de <span>YouTube</span>
            </h2>
            <p className={styles.ytText}>
              Suscríbete para acceder a tutoriales, conferencias y material
              educativo exclusivo sobre seguridad vial y cultura de paz en el
              Atlántico.
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
                src="https://www.youtube.com/embed/V6yMJATvpTU?autoplay=0&loop=1&playlist=V6yMJATvpTU"
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
