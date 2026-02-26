import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Productos.module.css';
import { productosInformacion } from './informacionProductos';
import ComponentesAula from './ComponentesAula';
import RecursosLibro from './RecursosLibro';
import CentroCapacitacion from './CentroCapacitacion'

const Productos = () => {
  const headerRef = useRef(null);
  const { hash } = useLocation();

  // Scroll automático suave desde el Home
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  // Interacción 3D del Header (Corregida)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleMouseMove = (e) => {
      const rect = header.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      header.style.setProperty('--mouse-x', `${x}px`);
      header.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      header.style.setProperty('--rotate-x', `${(y - centerY) / 20}deg`);
      header.style.setProperty('--rotate-y', `${(centerX - x) / 20}deg`);
    };

    header.addEventListener('mousemove', handleMouseMove);
    return () => header.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const catConfig = [
    { id: 'principios', label: 'Principios', icon: "📋", color: "#4A90E2" },
    { id: 'objetivos', label: 'Objetivos', icon: "🎯", color: "#E74C3C" },
    { id: 'caracteristicas', label: 'Características', icon: "💎", color: "#F1C40F" },
    { id: 'estrategias', label: 'Estrategias', icon: "🚀", color: "#2ECC71" }
  ];

  return (
    <div className={styles.container}>
      <header ref={headerRef} className={`${styles.mainHeader} fadeUpEffect`}>
        <div className={styles.headerContent}>
          <h1>Programas Educativos 🎓</h1>
          <div className={styles.typewriterContainer}>
            <p className={styles.typewriterText}>
              <span className={styles.typewriterSpan}>
                Modelos integrales diseñados para la transformación académica.
              </span>
            </p>
          </div>
        </div>
      </header>

      {productosInformacion.map((prod, index) => (
        <section key={prod.id} id={prod.id} className={`${styles.section} ${index % 2 !== 0 ? styles.reverse : ''} fadeUpEffect`}>
          <div className={styles.productMainContent}>
            <div className={styles.imageWrapper}>
              <img src={prod.image} alt={prod.title} className={styles.productImg} />
            </div>
            <div className={styles.textContent}>
              <h2 style={{ color: prod.color }}>{prod.title}</h2>
              <div className={styles.longText}>
                <p>{prod.content}</p>
                <p>{prod.content2}</p>
              </div>
            </div>
          </div>

          {/* Cards con efecto de cascada */}
          <div className={styles.specsWrapper}>
            {catConfig.map((cat, i) => (
              <div
                key={cat.id}
                className={`${styles.specBox} cascadeAnimation`} // Nueva clase para la animación
                style={{
                  "--accent-color": cat.color,
                  "--bg-card": `${cat.color}15`,
                  "--bg-hover": `${cat.color}25`,
                  // Cálculo de retraso: (base del producto) + (índice de card * 0.15s)
                  animationDelay: `${(index * 0.2) + (i * 0.15)}s`
                }}
              >
                <div className={styles.boxHeader}>
                  <span className={styles.boxIcon}>{cat.icon}</span>
                  <h4 style={{ color: cat.color }}>{cat.label}</h4>
                </div>
                <ul className={styles.boxList}>
                  {prod[cat.id].map(item => (
                    <li key={item} style={{ "--bullet-color": cat.color }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      <ComponentesAula />
      <RecursosLibro />
      <CentroCapacitacion />
    </div>
  );
};

export default Productos;