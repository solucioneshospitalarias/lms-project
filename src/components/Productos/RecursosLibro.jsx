import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import styles from './RecursosLibro.module.css';
import img from '../../assets/favicon.ico'

const Page = React.forwardRef((props, ref) => {
    return (
        <div className={styles.page} ref={ref}>
            {/* Contenedor de imagen a pantalla completa */}
            <div className={styles.fullPageImageWrapper}>
                <img src={props.image} alt="Contenido" className={styles.fullImage} />

                {/* Overlay opcional por si quieres poner texto encima que sea legible */}
                <div className={styles.pageOverlay}>
                    <div className={styles.pageTextContent}>
                        <h2 className={styles.pageTitle}>{props.title}</h2>
                        <p className={styles.pageDescription}>{props.children}</p>
                    </div>
                    <div className={styles.pageNumber}>{props.number}</div>
                </div>
            </div>
        </div>
    );
});

const RecursosLibro = () => {

    return (
        <div className={styles.bookContainer}>
            <div className={styles.header}>
                <span className={styles.overline}>RECURSOS</span>
                <h2 className={styles.title}>Explora nuestro material interactivo</h2>
            </div>

            <HTMLFlipBook width={350} height={450} size="fixed" showCover={true} className={styles.flipBook}>
                {/* PORTADA LIBRO REAL */}
                <div className={`${styles.page} ${styles.cover}`}>

                    {/* Lomo con detalle de tela y metal */}
                    <div className={styles.bookSpine}>
                        <div className={styles.rivet}></div>
                        <div className={styles.rivet}></div>
                        <div className={styles.rivet}></div>
                        <div className={styles.rivet}></div>
                    </div>

                    <div className={styles.coverContent}>
                        {/* Nubes posicionadas */}
                        <div className={`${styles.cloud} ${styles.cloud1}`}></div>
                        <div className={`${styles.cloud} ${styles.cloud2}`}></div>

                        {/* Bloque de Títulos */}
                        <div className={styles.titleWrapper}>
                            <h1 className={styles.mainTitle}>MIS PRIMEROS</h1>
                            <h1 className={styles.mainTitle}>PASOS SEGUROS</h1>
                            <p className={styles.subTitle}>Guía Práctica de Educación</p>
                        </div>

                        {/* Ilustración Centrada y Ajustada */}
                        <div className={styles.characterArea}>
                            <img src={img} alt="Ilustración Portada" className={styles.coverImage} />
                        </div>

                        {/* Cinta inferior */}
                        <div className={styles.ribbonContainer}>
                            <div className={styles.ribbon}>
                                ¡APRENDE Y EXPLORA!
                            </div>
                        </div>
                    </div>
                </div>

                {/* PÁGINAS INTERNAS (Ejemplos) */}
                <Page number="1" image={img}>
                    Descripción del experimento de pH y los pasos a seguir en el laboratorio virtual.
                </Page>
                <Page number="2" image={img}>
                    Instrucciones para la navegación en el aula virtual y entrega de tareas.
                </Page>
                <Page number="3" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="4" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="5" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="6" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="7" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="8" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="9" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>
                <Page number="10" image={img}>
                    Material complementario de matemáticas y lógica avanzada.
                </Page>


                {/* CONTRAPORTADA */}
                {/* CONTRATAPA (ÚLTIMA PÁGINA) */}
                <div className={`${styles.page} ${styles.backCover}`}>
                    <div className={styles.fullPageImageWrapper}>
                        {/* Imagen de cierre (por ejemplo, una de la escuela o el logo grande) */}
                        <img src={img} alt="Cierre" className={styles.fullImage} />

                        <div className={styles.backCoverOverlay}>
                            <div className={styles.backCoverContent}>
                                <h2 className={styles.finishTitle}>¡GRACIAS POR EXPLORAR!</h2>
                                <div className={styles.separator}></div>
                                <p className={styles.finishText}>Rutas del Saber - 2026</p>
                            </div>
                        </div>

                        {/* El lomo en la parte derecha para la contratapa */}
                        <div className={styles.bookSpineRight}>
                            <div className={styles.rivet}></div>
                            <div className={styles.rivet}></div>
                            <div className={styles.rivet}></div>
                            <div className={styles.rivet}></div>
                        </div>
                    </div>
                </div>
            </HTMLFlipBook>
        </div>
    );
};

export default RecursosLibro;