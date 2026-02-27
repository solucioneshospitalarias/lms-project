import React from 'react';
import styles from './Terminos.module.css'; 

const Terminos = () => {
    return (
        <div className="fadeUpEffect">
            <div className={styles.container}>
                <h1>Términos y Condiciones</h1>
                <p>Aquí va toda la información legal de Rutas del Saber...</p>
                {/* Resto de tu contenido legal */}
            </div>
        </div>
    );
};

export default Terminos;