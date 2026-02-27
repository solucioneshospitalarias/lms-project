import React from 'react';
import styles from './Autorizacion.module.css'; 

const Autorizacion = () => {
    return (
        <div className="fadeUpEffect">
            <div className={styles.container}>
                <h1>Autorización de Datos</h1>
                <p>Aquí va toda la información legal de Rutas del Saber...</p>
                {/* Resto de tu contenido legal */}
            </div>
        </div>
    );
};

export default Autorizacion;