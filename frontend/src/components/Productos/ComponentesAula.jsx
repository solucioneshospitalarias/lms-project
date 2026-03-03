import React, { useState } from "react";
import styles from "./ComponentesAula.module.css";
import { componentesData } from "./ComponentesData";
import img from "../../assets/Servicios.png";

const ComponentesAula = () => {
  const [activeTab, setActiveTab] = useState(1);
  const data = componentesData[activeTab];

  return (
    <section id="seccion-componentes" className={styles.container}>
      <div className={styles.header}>
        <span className={styles.overline}>COMPONENTES</span>
        <h2 className={styles.mainTitle}>
          Conoce cada uno de los componentes de la plataforma
        </h2>
      </div>

      {/* Barra de Navegación Numérica */}
      <div className={styles.tabBar}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className={`${styles.tabButton} ${activeTab === num ? styles.active : ""}`}
            onClick={() => setActiveTab(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Contenido Dinámico con Animación */}
      <div className={styles.contentWrapper} key={activeTab}>
        <div className={styles.mediaSide}>
          {data.videoUrl ? (
            <iframe
              className={styles.videoFrame}
              src={data.videoUrl}
              title={data.titulo}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={data.imagen}
              alt={data.titulo}
              className={styles.mainImage}
            />
          )}
        </div>

        <div className={styles.infoSide}>
          <h3 className={styles.infoTitle}>{data.titulo}</h3>
          <p className={styles.description}>{data.descripcion}</p>

          <ul className={styles.itemList}>
            {data.items.map((item, index) => (
              <li key={index}>
                <span className={styles.checkIcon}>✔</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ComponentesAula;
