import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapPin, Phone, Mail } from "lucide-react";
import { faFacebookF, faInstagram, faTiktok, faWhatsapp, } from "@fortawesome/free-brands-svg-icons";
import pdf from '../Footer/Docs/TerminosCondiciones.pdf'

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
            <a href="https://www.facebook.com/walter.ad.228863" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/walter_ldk/" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://wa.me/573234876604" aria-label="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="https://www.tiktok.com/@trendigroup" aria-label="TikTok">
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
                <a href="/conocenos">¿Quiénes somos?</a>
              </li>
              <li>
                <a href="/estadisticas">Estadísticas</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Recursos</h3>
            <ul>
              <li>
                <a href="/productos">Productos</a>
              </li>
              <li>
                <a href="/recursos">Recursos Educativos</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Legal</h3>
            <ul className={styles.legalList}>
              <li>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Autorización de Datos
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* NUEVA SECCIÓN: Barra de Contacto Horizontal */}
        <div className={styles.footerContactBar}>
          <div className={styles.contactItem}>
            <div className={styles.iconCircle}>
              <MapPin size={20} strokeWidth={2.5} />
            </div>
            <p>
              Cl. 58 #37 - 05, Suroccidente, Barranquilla, Atlántico
            </p>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconCircle}>
              <Phone size={20} strokeWidth={2.5} />
            </div>
            <p>+57 320 788 73 27 / +57 315 856 59 85</p>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconCircle}>
              <Mail size={20} strokeWidth={2.5} />
            </div>
            <p>info@trendigroup.com</p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Rutas del Saber. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
