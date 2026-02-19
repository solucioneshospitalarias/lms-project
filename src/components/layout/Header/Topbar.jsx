import styles from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
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
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '14px' }} /> waltersteven.dev@gmail.com
          </span>
        </div>

        {/* Lado derecho: Redes Sociales */}
        <div className={styles.socials}>
          <a href="https://www.facebook.com/walter.ad.228863" target="_blank" rel="noopener noreferrer" className={styles.faFacebook} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/walter_ldk/" target="_blank" rel="noopener noreferrer" className={styles.faInstagram} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.faTiktok} style={{ fontSize: '16px' }}>
            <FontAwesomeIcon icon={faTiktok} />
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