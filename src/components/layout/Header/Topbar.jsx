// src/components/layout/Header/Topbar.jsx
import styles from "./Header.module.css";
import { Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.container}>
        {/* Información de contacto a la izquierda */}
        <div className={styles.contactInfo}>
          <span>
            <Phone size={14} /> (+1) 3344 999 999
          </span>
          <span>
            <Mail size={14} /> waltersteven.dev@gmail.com
          </span>
        </div>

        {/* Lado derecho: Botones + Redes Sociales */}

        <div className={styles.socials}>
          <Facebook size={16} />
          <Twitter size={16} />
          <Linkedin size={16} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
