import React, { useState } from 'react';
import styles from './ClassroomHome.module.css';
import cocodriloImg from '../../assets/favicon.ico';
import imagenModalBienvenida from '../../assets/Item1.png';
import imagenModalMetodologia from '../../assets/Item2.png';
import { useUser } from '../../context/UserContext';

const ClassroomHome = () => {
  const { userData } = useUser();
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.textContent}>
          <span className={styles.badge}>Guía Práctica</span>
          <h1 className={styles.title}>
            Seguridad Vial: <br />
            <span className={styles.highlight}>Grado Transición</span>
          </h1>
          <p className={styles.description}>
            Una plataforma educativa diseñada para enseñar a niños y adolescentes los fundamentos de la seguridad vial a través de experiencias interactivas, videos inmersivos y simuladores realistas.
          </p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={() => setModalContent('bienvenida')}>
              Comenzar ahora
            </button>
            <button className={styles.btnSecondary} onClick={() => setModalContent('metodologia')}>
              Ver metodología
            </button>
          </div>
        </div>

        <div className={styles.imageContent}>
          <img src={cocodriloImg} alt="Personaje" className={styles.character} />
        </div>
      </div>

      {modalContent && (
        <div className={styles.modalOverlay} onClick={() => setModalContent(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setModalContent(null)}>×</button>

            <div className={styles.modalBody}>
              <div className={styles.modalLayoutGrid}>

                <div className={styles.modalTextColumn}>
                  {modalContent === 'bienvenida' ? (
                    <>
                      <div className={styles.badgeSmall}>Módulo Introductorio</div>
                      <h2 className={styles.modalTitle}>¡Bienvenido, {userData.nombre}! 👋</h2>
                      <p className={styles.modalSubtitle}>Inicia tu formación en Seguridad Vial.</p>

                      <div className={styles.learningPath}>
                        <div className={styles.pathItem}>
                          <div className={styles.pathIcon}>01</div>
                          <div>
                            <h4>Normas Fundamentales</h4>
                            <p>Conocerás el marco legal y los principios éticos que rigen el tránsito. Aprenderás por qué las reglas no son solo prohibiciones, sino herramientas para salvar vidas.</p>
                          </div>
                        </div>
                        <div className={styles.pathItem}>
                          <div className={styles.pathIcon}>02</div>
                          <div>
                            <h4>Comportamiento Seguro</h4>
                            <p>Identificarás las conductas de riesgo y desarrollarás hábitos preventivos, ya sea que te muevas como peatón, ciclista o futuro conductor.</p>
                          </div>
                        </div>
                        <div className={styles.pathItem}>
                          <div className={styles.pathIcon}>03</div>
                          <div>
                            <h4>Señalética Vial</h4>
                            <p>Aprenderás a interpretar rápidamente señales preventivas, reglamentarias e informativas para tomar decisiones seguras en fracciones de segundo..</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.badgeSmall}>Nuestra Ruta</div>
                      <h2 className={styles.modalTitle}>Metodología</h2>
                      <div className={styles.proMethodGrid}>
                        <div className={styles.proMethodItem}>
                          <div className={styles.methodHeader}>
                            <div className={styles.dot}></div>
                            <h3>Aprendizaje Activo</h3>
                          </div>
                          <p>Olvídate de las clases aburridas. Nuestra metodología se basa en simuladores de situaciones reales y videos en alta resolución donde tú tomas las decisiones.</p>
                        </div>
                        <div className={styles.proMethodItem}>
                          <div className={styles.methodHeader}>
                            <div className={styles.dot}></div>
                            <h3>Evaluación Continua</h3>
                          </div>
                          <p>Aquí no hay un examen final que te genera ansiedad. Cada video visto, cada reto superado y cada participación te suma puntos. Tu progreso se mide en tiempo real a través de misiones y niveles que desbloquean nuevos conocimientos.</p>
                        </div>
                        <div className={styles.proMethodItem}>
                          <div className={styles.methodHeader}>
                            <div className={styles.dot}></div>
                            <h3>Certificación</h3>
                          </div>
                          <p>Al completar todos los niveles, obtendrás un certificado digital respaldado por la plataforma. Este incluye un código QR único que permite a cualquier institución verificar tus competencias en Seguridad Vial de manera instantánea.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.modalImageColumn}>
                  <img
                    src={modalContent === 'bienvenida' ? imagenModalBienvenida : imagenModalMetodologia}
                    alt="Ilustración"
                    className={styles.modalMainImage}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomHome;