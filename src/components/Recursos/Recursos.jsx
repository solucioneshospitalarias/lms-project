import React from "react";
import styles from "./Recursos.module.css";
import { FileText, Video, Download } from "lucide-react";

const Recursos = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Centro de <span>Recursos</span>
        </h1>
        <p>Material didáctico gratuito para docentes y estudiantes.</p>
      </header>
      <div className={styles.list}>
        <div className={styles.resourceItem}>
          <FileText color="#C22821" />
          <div className={styles.info}>
            <h4>Guía de Seguridad Vial 2024 (PDF)</h4>
            <span>Actualizado hace 2 días • 4.5 MB</span>
          </div>
          <Download className={styles.downloadIcon} />
        </div>
        <div className={styles.resourceItem}>
          <Video color="#C22821" />
          <div className={styles.info}>
            <h4>Video: Primeros Auxilios en Ruta</h4>
            <span>Duración: 15:20 min • HD</span>
          </div>
          <Download className={styles.downloadIcon} />
        </div>
      </div>
    </div>
  );
};

export default Recursos;
