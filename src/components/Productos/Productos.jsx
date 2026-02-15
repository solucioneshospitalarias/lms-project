import React from "react";
import styles from "./Productos.module.css";
import { ShoppingBag, CheckCircle, Star } from "lucide-react";

const Productos = () => {
  const items = [
    {
      title: "Módulo Vial Pro",
      desc: "Simulador avanzado de conducción urbana.",
      price: "$49.99",
    },
    {
      title: "Kit Educativo LOM",
      desc: "Paquete completo de recursos multimedia.",
      price: "$29.99",
    },
    {
      title: "Certificación Gold",
      desc: "Validación oficial de competencias viales.",
      price: "$15.00",
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Nuestros <span>Productos</span>
        </h1>
        <p>Herramientas premium para potenciar el aprendizaje interactivo.</p>
      </header>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <ShoppingBag className={styles.icon} size={40} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className={styles.footer}>
              <span className={styles.price}>{item.price}</span>
              <button className={styles.btn}>Detalles</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
