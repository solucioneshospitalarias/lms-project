import React from "react";
import styles from "./Hero.module.css";

const Hero = ({ badge, title, p1, p2, highlight, quote, videoSrc, bgColor }) => {
  return (
    <div className={styles.heroSection}>
      <div
        className={styles.mainContainer}
        style={{ backgroundColor: bgColor }} // <--- Esto aplica el color único
      >
        <div className={styles.infoColumn}>
          <span className={styles.topBadge}>{badge}</span>

          <h1 className={styles.title}>{title}</h1>

          <div className={styles.textContent}>
            <p>{p1}</p>
            <p>{p2}</p>

            <p className={styles.greenHighlight}>{highlight}</p>

            <div className={styles.redQuote}>
              <p>{quote}</p>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <a href="#mision" className={styles.btnRed}>
              Conoce más información
            </a>
          </div>
        </div>

        <div className={styles.videoColumn}>
          <div className={styles.videoWrapper}>
            <video autoPlay loop muted playsInline className={styles.sideVideo}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
