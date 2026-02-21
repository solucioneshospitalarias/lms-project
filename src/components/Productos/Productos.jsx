import React from 'react';
import styles from './Productos.module.css';
import { productosInformacion } from './informacionProductos';

const Productos = () => {
  return (
    <div className={styles.container}>
      <header className={styles.mainHeader}>
        <h1>Portafolio de Programas Educativos</h1>
        <p>Modelos integrales diseñados para la transformación social y académica.</p>
      </header>

      {productosInformacion.map((prod, index) => (
        <section
          key={prod.id}
          id={prod.id}
          className={`${styles.section} ${index % 2 !== 0 ? styles.reverse : ''}`}
        >
          <div className={styles.imageWrapper}>
            <img src={prod.image} alt={prod.title} className={styles.productImg} />
            <div className={styles.colorBlock} style={{ backgroundColor: prod.color }}></div>
          </div>

          <div className={styles.textContent}>
            <h2 style={{ color: prod.color }}>{prod.title}</h2>
            <div className={styles.longText}>
              <p>{prod.content}</p>
              <p>{prod.content2}</p>
              <p>{prod.content3}</p>
            </div>

            <div className={styles.gridInfo}>
              <div className={styles.infoCol}>
                <h4>Principios</h4>
                <ul>{prod.principios.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
              <div className={styles.infoCol}>
                <h4>Objetivos</h4>
                <ul>{prod.objetivos.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
              <div className={styles.infoCol}>
                <h4>Características</h4>
                <ul>{prod.caracteristicas.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
              <div className={styles.infoCol}>
                <h4>Estrategias</h4>
                <ul>{prod.estrategias.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Productos;