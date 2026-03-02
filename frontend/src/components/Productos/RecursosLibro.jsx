import React, { useRef, useCallback } from 'react'; // Añadimos hooks para optimización
import HTMLFlipBook from 'react-pageflip';
import styles from './RecursosLibro.module.css';
import img from '../../assets/favicon.ico';
import sound from '../../assets/sounds/sound.mp3'

const Page = React.forwardRef((props, ref) => {
    return (
        <div className={styles.page} ref={ref}>
            <div className={styles.fullPageImageWrapper}>
                <img src={props.image} alt="Contenido" className={styles.fullImage} />
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
    // 1. Referencia para el audio (Senior tip: evita re-renders innecesarios)
    const audioRef = useRef(null);

    // 2. Función memorizada para disparar el sonido
    const onFlip = useCallback((e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reinicia el audio si pasan páginas rápido
            audioRef.current.play().catch(err => {
                // Silenciamos el error de autoplay de los navegadores si ocurre
                console.log("Esperando interacción para audio");
            });
        }
    }, []);

    return (
        <div className={styles.bookContainer}>
            {/* 3. El recurso de audio oculto */}
            <audio
                ref={audioRef}
                src={sound}
                preload="auto"
            />

            <div className={styles.header}>
                <span className={styles.overline}>RECURSOS</span>
                <h2 className={styles.title}>Explora nuestro material interactivo</h2>
            </div>

            <HTMLFlipBook
                width={350}
                height={450}
                size="fixed"
                showCover={true}
                className={styles.flipBook}
                onFlip={onFlip} // 4. Conectamos el evento al FlipBook
                maxShadowOpacity={0.5}
            >
                {/* PORTADA LIBRO REAL */}
                <div className={`${styles.page} ${styles.cover}`}>
                    <div className={styles.bookSpine}>
                        <div className={styles.rivet}></div>
                        <div className={styles.rivet}></div>
                        <div className={styles.rivet}></div>
                        <div className={styles.rivet}></div>
                    </div>

                    <div className={styles.coverContent}>
                        <div className={`${styles.cloud} ${styles.cloud1}`}></div>
                        <div className={`${styles.cloud} ${styles.cloud2}`}></div>

                        <div className={styles.titleWrapper}>
                            <h1 className={styles.mainTitle}>MIS PRIMEROS</h1>
                            <h1 className={styles.mainTitle}>PASOS SEGUROS</h1>
                            <p className={styles.subTitle}>Guía Práctica de Educación</p>
                        </div>

                        <div className={styles.characterArea}>
                            <img src={img} alt="Ilustración Portada" className={styles.coverImage} />
                        </div>

                        <div className={styles.ribbonContainer}>
                            <div className={styles.ribbon}>
                                ¡APRENDE Y EXPLORA!
                            </div>
                        </div>
                    </div>
                </div>

                {/* PÁGINAS INTERNAS */}
                {[...Array(10)].map((_, i) => (
                    <Page key={i} number={i + 1} image={img} title={`Recurso #${i + 1}`}>
                        Material complementario de matemáticas y lógica avanzada para el grado correspondiente.
                    </Page>
                ))}

                {/* CONTRATAPA (ÚLTIMA PÁGINA) */}
                <div className={`${styles.page} ${styles.backCover}`}>
                    <div className={styles.fullPageImageWrapper}>
                        <img src={img} alt="Cierre" className={styles.fullImage} />
                        <div className={styles.backCoverOverlay}>
                            <div className={styles.backCoverContent}>
                                <h2 className={styles.finishTitle}>¡GRACIAS POR EXPLORAR!</h2>
                                <div className={styles.separator}></div>
                                <p className={styles.finishText}>Rutas del Saber - 2026</p>
                            </div>
                        </div>
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