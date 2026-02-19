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
      image:
        "https://www.quitoinforma.gob.ec/wp-content/uploads/2025/02/4983643217648005339-e1739200751585-800x445.jpg",
      label: "Formacion Completa",
    },
    {
      id: 2,
      title: "Cultura de Paz",
      description: "Transformando comunidades con software integral.",
      image:
        "https://www.caritas.org.mx/wp-content/uploads/2022/09/valores-de-la-cultura-de-paz-1024x768.jpg",
      label: "Convivencia Armónica",
    },
    {
      id: 3,
      title: "Educación Ambiental",
      description: "Herramientas para el cuidado y desarrollo infantil.",
      image:
        "https://media.istockphoto.com/id/1435661954/photo/children-holding-a-planet-outdoors.jpg?s=1024x1024&w=is&k=20&c=QEjJBfN4mr63fUhuflW5XL-2a67clNQz7S3RamJwa3I=",
      label: "Transformación Colectiva ",
    },
    {
      id: 4,
      title: "Convivencia Escolar",
      description: "Fomentando líderes en convivencia escolar.",
      image:
        "https://images.pexels.com/photos/8926543/pexels-photo-8926543.jpeg",
      label: "Respeto Mutuo",
    },
    {
      id: 5,
      title: "Educación Vial",
      description: "Fomentando líderes en convivencia escolar.",
      image:
        "https://img.freepik.com/vector-premium/imagenes-profesionales_753212-5309.jpg?semt=ais_user_personalization&w=740&q=80",
      label: "Movilidad Segura",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(nextSlide, 2500);
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
              backgroundImage: `linear-gradient(to right, rgba(0, 51, 102, 0.85), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
            }}
          >
            <div className={styles.slideContent}>
              <span className={styles.label}>{slide.label}</span>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button className={styles.slideBtn}>Saber más</button>
            </div>
          </div>
        ))}
      </div>
      <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}>
        ❮
      </button>
      <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}>
        ❯
      </button>
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
