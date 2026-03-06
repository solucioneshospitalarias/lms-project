import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero = ({
  badge,
  title,
  p1,
  p2,
  highlight,
  quote,
  videoSrc,
  bgColor,
  linkTo,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

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
            <Link to={`/productos#${linkTo}`} className={styles.btnRed}>
              Conoce más información
            </Link>
          </div>
        </div>

        <div className={styles.videoColumn}>
          <div className={styles.videoWrapper}>
            {videoSrc.includes("youtube.com") ||
            videoSrc.includes("youtu.be") ? (
              <iframe
                key={videoSrc}
                className={styles.sideVideo}
                src={
                  videoSrc.replace("watch?v=", "embed/") +
                  "?autoplay=1&mute=1&loop=1&playlist=" +
                  videoSrc.split("v=")[1]
                }
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                key={videoSrc}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className={styles.sideVideo}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
