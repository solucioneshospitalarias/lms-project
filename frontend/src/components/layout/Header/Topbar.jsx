import styles from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.container}>
        {/* Información de contacto a la izquierda */}
        <div className={styles.contactInfo}>
          <span className={styles.contactItem}>
            <FontAwesomeIcon icon={faPhone} style={{ fontSize: '14px' }} /> (+57) 323 487 6604
          </span>
          <span className={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '14px' }} /> rutasdelsaber41@gmail.com 
          </span>
        </div>

        {/* Lado derecho: Redes Sociales */}
        <div className={styles.socials}>
          <a href="https://www.facebook.com/people/Rutas-Del-Saber/61561207295039/" target="_blank" rel="noopener noreferrer" className={styles.faFacebook} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/rutasdelsaber_colombia/" target="_blank" rel="noopener noreferrer" className={styles.faInstagram} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.youtube.com/@RutasdelSaberColombia" target="_blank" rel="noopener noreferrer" className={styles.faTiktok} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://wa.me/573234876604" target="_blank" rel="noopener noreferrer" className={styles.faWhatsapp} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default Topbar;