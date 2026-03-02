import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./WhatsAppQR.module.css";

const WhatsAppQR = () => {
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const whatsappUrl = "https://wa.me/573234876604?text=Hola%20%F0%9F%91%8B%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Rutas%20del%20Saber.%20%C2%BFPodr%C3%ADan%20brindarme%20asesor%C3%ADa%20personalizada%3F%20Muchas%20gracias.";
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(whatsappUrl)}`;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollBtn(true);
            } else {
                setShowScrollBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${styles.floatContainer} ${showScrollBtn ? styles.isUp : styles.isDown}`}>
            <div className={styles.qrTooltip}>
                <img src={qrImageUrl} alt="QR WhatsApp" />
                <p className={styles.qrText}>¡Escríbenos!</p>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                <FontAwesomeIcon icon={faWhatsapp} />
            </a>
        </div>
    );
};

export default WhatsAppQR;