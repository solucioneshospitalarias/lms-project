import React from 'react';
import styles from './Privacidad.module.css';

const Privacidad = () => {
    return (
        <div className="fadeUpEffect">
            <div className={styles.container}>
                <h1>Política de Privacidad</h1>
                <p>Aquí va toda la información legal de Rutas del Saber...</p>
                {/* Resto de tu contenido legal */}
            </div>
        </div>
    );
};

export default Privacidad;