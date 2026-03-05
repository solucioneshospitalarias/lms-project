import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contacto.module.css";
import imgFormulario from "../../assets/FormularioContacto.png";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

const Contacto = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(value));
  };

  // Variantes para los iconos flotantes (entran uno por uno)
  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 0.7,
      scale: 1,
      transition: {
        delay: i * 0.1, // Retraso escalonado
        duration: 0.5,
        ease: "backOut",
      },
    }),
  };

  return (
    <motion.div
      className={styles.contactPage}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* DECORACIONES FLOTANTES CON ANIMACIÓN INDIVIDUAL */}
      <div className={styles.floatingDecorations}>
        {["🛑", "🚗", "📚", "🚦", "🚲", "🚶", "⚠️", "⛽"].map(
          (emoji, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className={`${styles.floatItem} ${styles[`item${index + 1}`]}`}
            >
              {emoji}
            </motion.div>
          ),
        )}
      </div>

      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Contacto</h1>

        <div className={styles.topSection}>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7507959566474!2d-74.8003483259098!3d10.982173255366872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d28cfb20989%3A0x1e933b9620a66d35!2sCl.%2058%20%2337%20-%2005%2C%20Suroccidente%2C%20Barranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1sen!2sco!4v1771527601427!5m2!1sen!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación Rutas del Saber"
            ></iframe>
          </div>

          <div className={styles.infoWrapper}>
            <h2 className={styles.brandName}>
              RUTAS DEL <span>SABER</span>
            </h2>
            <p className={styles.description}>
              Comunícate con nosotros para conocer toda nuestra oferta educativa
              vial.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <MapPin className={styles.iconRed} size={45} />
                <p>Cl. 58 #37 - 05, Suroccidente, Barranquilla, Atlántico</p>
              </div>
              <div className={styles.infoItem}>
                <Phone className={styles.iconRed} size={45} />
                <p>+57 000 000 000</p>
              </div>
              <div className={styles.infoItem}>
                <Mail className={styles.iconRed} size={45} />
                <p>contactos@rutasdelsaber.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO CON GLASSMORPHISM */}
        <div className={styles.formCard}>
          {/* Columna Izquierda: El Formulario */}
          <div className={styles.formSide}>
            <h3 className={styles.formSubtitle}>FORMULARIO DE CONTACTO</h3>
            <form className={styles.contactForm}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={handleEmailChange}
                  className={`${styles.input} ${isValidEmail ? styles.valid : ""}`}
                  required
                />
                {isValidEmail && (
                  <CheckCircle size={18} className={styles.checkIcon} />
                )}
              </div>
              <input
                type="text"
                placeholder="Asunto"
                className={styles.input}
              />
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                rows="4"
                className={styles.textarea}
              ></textarea>
              <button type="submit" className={styles.submitBtn}>
                Enviar Mensaje <Send size={18} />
              </button>
            </form>
          </div>

          {/* Columna Derecha: Soporte e Imagen */}
          <div className={styles.imageSide}>
            <div className={styles.supportBadge}>
              <span>🎓 Orientación Académica</span>
            </div>
            <h2 className={styles.supportTitle}>
              ¿Dudas con tu <span>proceso formativo?</span>
            </h2>
            <p className={styles.supportText}>
              Si eres estudiante y necesitas apoyo con los materiales, talleres
              o acceso a la plataforma virtual, estamos aquí para guiarte en tu
              aprendizaje.
            </p>

            {/* NUEVA INFO: Horarios de Atención */}
            <div className={styles.extraInfo}>
              <div className={styles.infoRow}>
                <strong>Lunes a Viernes:</strong> <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className={styles.infoRow}>
                <strong>Sábados:</strong> <span>9:00 AM - 1:00 PM</span>
              </div>
            </div>

            {/* BOTÓN RÁPIDO: WhatsApp */}
            <a href="https://wa.me/57000000000" className={styles.whatsappBtn}>
              Contactar por WhatsApp
            </a>

            <div className={styles.supportImageContainer}>
              <img
                src={imgFormulario}
                alt="Soporte Personalizado"
                className={styles.supportImage}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contacto;
