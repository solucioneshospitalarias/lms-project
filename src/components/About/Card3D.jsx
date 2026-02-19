import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./About.module.css";

const Card3D = ({ title, text, icon, color }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        const x = (clientX - left) / width;
        const y = (clientY - top) / height;

        // Inclinación sutil de 15 grados
        const tiltX = (y - 0.5) * 15;
        const tiltY = (x - 0.5) * -15;

        setRotation({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

    return (
        <div
            className={styles.card3D}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                borderTop: `5px solid ${color}` // Línea de color dinámica
            }}
        >
            <div className={styles.iconWrapper} style={{ color: color }}>
                <FontAwesomeIcon icon={icon} size="3x" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            {/* Reflejo interno para mayor realismo */}
            <div className={styles.innerGlow} />
        </div>
    );
};

export default Card3D;