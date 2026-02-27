import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Gallery.module.css";

export default ({ data, activeSlide: initialSlide }) => {
  const [activeSlide, setactiveSlide] = useState(initialSlide);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  const next = useCallback(() => {
    setactiveSlide((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  }, [data.length]);

  const prev = useCallback(() => {
    setactiveSlide((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  }, [data.length]);

  // Lógica de Autoplay (Cada 3 segundos para que sea legible)
  useEffect(() => {
    let interval = null;
    if (!isPaused && !selectedImg) {
      // Pausar si hay una imagen abierta
      interval = setInterval(() => {
        next();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [next, isPaused, selectedImg]);

  const handleCardClick = (i, item) => {
    if (activeSlide === i) {
      setSelectedImg(item); // Abrir Lightbox
    } else {
      setactiveSlide(i);
    }
  };

  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = "hidden"; // Bloquea el scroll de la web de fondo
    } else {
      document.body.style.overflow = "auto"; // Lo devuelve a la normalidad al cerrar
    }
  }, [selectedImg]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const touchEndX = e.clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 30) {
      if (diff > 0) next();
      else prev();
      touchStartX.current = touchEndX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  const getStyles = (index) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    return {
      opacity: 0,
      transform: `translateX(${index < activeSlide ? -480 : 480}px) translateZ(-500px) rotateY(${index < activeSlide ? 35 : -35}deg)`,
      zIndex: 7,
    };
  };

  return (
    <section id="galeria" className={styles.galleryWrapper}>
      <h2 className={styles.sectionTitle}>Guías de Información Vial</h2>
      <div className={styles.underline}></div>

      <div
        className={styles.slideC}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsPaused(false);
        }}
        onMouseEnter={() => setIsPaused(true)}
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
      >
        {data.map((item, i) => (
          <div
            key={item.id}
            className={styles.slide}
            style={getStyles(i)}
            onClick={() => handleCardClick(i, item)}
          >
            <div className={styles.card}>
              <img
                src={item.img}
                alt={item.title}
                className={styles.cardImg}
                draggable="false"
              />
              <div className={styles.cardContent}>
                <h3>{item.title}</h3>
                <div className={styles.divider}></div>
                <p>{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EL BLOQUE DE LAS FLECHAS SE HA ELIMINADO PARA LIMPIAR EL DISEÑO */}

      {selectedImg && (
        <div className={styles.lightbox} onClick={() => setSelectedImg(null)}>
          <span className={styles.close}>&times;</span>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImg.img} alt={selectedImg.title} />
            <div className={styles.lightboxText}>
              <h2>{selectedImg.title}</h2>
              <p>{selectedImg.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
