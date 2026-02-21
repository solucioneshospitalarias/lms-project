import React, { useState, useEffect } from "react";
import styles from "./InfoCarousel.module.css";

const InfoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Educación 360",
      description: "Plataformas educativas interactivas a tu alcance.",
      image: "https://i.imgur.com/MMgnwo9.png",
      targetId: "educacion-360",
      label: "Formación Completa",
    },
    {
      id: 2,
      title: "Cultura de Paz",
      description: "Transformando comunidades con software integral.",
      image: "https://i.imgur.com/e86NR8z.png",
      targetId: "cultura-paz",
      label: "Convivencia Armónica",
    },
    {
      id: 3,
      title: "Educación Ambiental",
      description: "Herramientas para el cuidado y desarrollo infantil.",
      image: "https://i.imgur.com/XANLUgI.png",
      targetId: "educacion-ambiental",
      label: "Transformación Colectiva",
    },
    {
      id: 4,
      title: "Convivencia Escolar",
      description: "Fomentando líderes en convivencia escolar.",
      image: "https://i.imgur.com/Kg36tqR.jpeg",
      targetId: "convivencia-escolar",
      label: "Respeto Mutuo",
    },
    {
      id: 5,
      title: "Educación Vial",
      description: "Formando ciudadanos responsables en la vía pública.",
      image: "https://i.imgur.com/06ScaPI.png",
      targetId: "educacion-vial",
      label: "Movilidad Segura",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  

  useEffect(() => {
    let timer;
    if (!isPaused) {
      // Tiempo ajustado a 3000ms para una mejor lectura (como sugerido antes)
      timer = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={styles.slide}
            style={{
              // Usamos un degradado sutil para no tapar la nitidez de la imagen completa
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, transparent 100%), url(${slide.image})`,
            }}
          >
            <div className={styles.slideContent}>
              <span className={styles.label}>{slide.label}</span>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button className={styles.slideBtn} onClick={() => handleScroll(slide.targetId)}>
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación sobre la imagen */}
      <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}>❮</button>
      <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}>❯</button>

      {/* Indicadores centrados */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoCarousel;