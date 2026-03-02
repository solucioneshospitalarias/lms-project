import React, { useState, useEffect } from "react";
import styles from "./Recursos.module.css";
import { FileText, Video, Download, BookOpen } from "lucide-react";
// Importa la imagen de la portada (ajusta la ruta según tu proyecto)
// import PortadaImg from "../../assets/portada_capi.png";

const Recursos = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // El libro se abre automáticamente tras 1 segundo de carga
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Centro de <span>Recursos</span>
        </h1>
        <p>Material didáctico gratuito para docentes y estudiantes.</p>
      </header>

      {/* CONTENEDOR DEL LIBRO INTERACTIVO */}
      <div className={styles.bookWrapper}>
        <div className={`${styles.book} ${isOpen ? styles.bookOpen : ""}`}>
          {/* PORTADA (La que se mueve) */}
          {/* PORTADA: Esta es la que tiene que rotar */}
          <div className={styles.cover}>
            <div className={styles.coverFront}>
              <div className={styles.coverDesign}>
                <h3>MIS PRIMEROS</h3>
                <h2>PASOS SEGUROS</h2>
                <div className={styles.capiBadge}>🐊</div>
              </div>
            </div>
          </div>

          {/* PÁGINAS INTERIORES (El contenido que aparece al abrirse) */}
          <div className={styles.pagesInner}>
            <div className={styles.resourceListInside}>
              <h3>Contenido Digital</h3>

              <div className={styles.resourceItemInside}>
                <FileText color="#C22821" size={20} />
                <div className={styles.infoInside}>
                  <h4>Guía Seguridad 2024</h4>
                  <span>PDF • 4.5 MB</span>
                </div>
                <Download size={18} className={styles.downloadBtn} />
              </div>

              <div className={styles.resourceItemInside}>
                <Video color="#C22821" size={20} />
                <div className={styles.infoInside}>
                  <h4>Video Auxilios</h4>
                  <span>15 min • HD</span>
                </div>
                <Download size={18} className={styles.downloadBtn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recursos;
