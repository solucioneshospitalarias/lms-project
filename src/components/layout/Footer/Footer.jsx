import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Sección de Marca y Redes */}
        <div className={styles.brandSection}>
          <h2 className={styles.logo}>
            Rutas del Saber<span>.</span>
          </h2>
          <p className={styles.description}>
            Transformando la educación vial y la crianza segura a través de
            tecnología interactiva y compromiso social.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="Youtube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" aria-label="TikTok">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

        {/* Enlaces de Navegación */}
        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <h3>Plataforma</h3>
            <ul>
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">¿Quiénes somos?</a>
              </li>
              <li>
                <a href="#">Estadísticas</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Recursos</h3>
            <ul>
              <li>
                <a href="#">Productos</a>
              </li>
              <li>
                <a href="#">Recursos Educativos</a>
              </li>
              <li>
                <a href="#">Contacto</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Legal</h3>
            <ul>
              <li>
                <a href="#">Términos y Condiciones</a>
              </li>
            </ul>
          </div>
        </div>

        {/* NUEVA SECCIÓN: Barra de Contacto Horizontal */}
        <div className={styles.footerContactBar}>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📍</span>
            <p>
              Parque Industrial Los Robles, Km. 1 Vía Bogotá - Siberia, Cota.
              Oficina 302
            </p>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📞</span>
            <p>+57 320 788 73 27 / +57 315 856 59 85</p>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>✉️</span>
            <p>info@trendigroup.com</p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Echooling. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
