import React from "react";
import styles from "./Desempeños.module.css";
// IMPORTAMOS LOS ICONOS PROFESIONALES
import { FiTarget, FiAward, FiZap, FiClock, FiBookOpen, FiCheckCircle } from "react-icons/fi"; // Feather Icons (muy minimalistas)
import { MdOutlineAssessment } from "react-icons/md"; // Material Design

const Desempeños = () => {
  // 1. Datos de Stats (Añadimos iconos profesionales)
  const stats = [
    { id: 1, label: "Progreso del Curso", value: 100, display: "100%", color: "#c22821", Icon: FiBookOpen },
    { id: 2, label: "Tareas Completadas", value: 80, display: "8/10", color: "#2d3436", Icon: FiCheckCircle },
    { id: 3, label: "Promedio Actual", value: 90, display: "4.5", color: "#c22821", Icon: MdOutlineAssessment },
    { id: 4, label: "Tiempo en Ruta", value: 60, display: "4h 25m", color: "#c22821", Icon: FiClock }
  ];

  // 2. Datos de Logros (Iconos profesionales a color)
  const badges = [
    { id: 1, name: "Pionero", Icon: FiAward, unlocked: true, color: "#f1c40f" }, // Dorado
    { id: 2, name: "Perfecto", Icon: FiTarget, unlocked: false, color: "#3498db" }, // Azul
    { id: 3, name: "Constante", Icon: FiZap, unlocked: false, color: "#e67e22" } // Naranja
  ];

  const weeklyActivity = [10, 40, 80, 50, 20, 90, 30];

  return (
    <div className={styles.fadeUpEffect}>
      <header className={styles.headerClean}>
        <h1 className={styles.title}>Mi Desempeño</h1>
        <p className={styles.subtitle}>Sigue de cerca tu evolución en Rutas del Saber.</p>
      </header>

      {/* Grid de Stats con Iconos Profesionales */}
      <div className={styles.statsContainer}>
        {stats.map((item) => {
          const { Icon } = item; // Extraemos el componente del icono
          return (
            <div key={item.id} className={styles.statCard}>
              <div className={styles.statCardHeader}>
                <span className={styles.statLabel}>{item.label}</span>
                {/* Renderizamos el icono con el color definido */}
                <Icon className={styles.statIcon} style={{ color: item.color }} />
              </div>
              <div className={styles.statValue}>{item.display}</div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.value === 100 ? "#2ecc71" : item.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.lowerGrid}>
        {/* Punto 1: Logros con Iconos Profesionales y Colores */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>Logros Obtenidos</h3>
          <div className={styles.badgesRow}>
            {badges.map(b => {
              const { Icon } = b;
              return (
                <div key={b.id} className={`${styles.badge} ${!b.unlocked && styles.locked}`}>
                  <div className={styles.badgeIconContainer}>
                    {/* El icono usa su color si está desbloqueado, o gris si está bloqueado */}
                    <Icon className={styles.badgeIconPro} style={{ color: b.unlocked ? b.color : "#94a3b8" }} />
                  </div>
                  <span className={styles.badgeName}>{b.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Punto 2: Actividad Semanal (Sin cambios) */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>Actividad Semanal</h3>
          <div className={styles.chartArea}>
            {weeklyActivity.map((height, i) => (
              <div key={i} className={styles.barContainer}>
                <span className={styles.barPercentage}>{height}%</span>
                <div className={styles.bar} style={{ height: `${height}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Punto 3: Próximo Objetivo con Icono Profesional */}
      <div className={styles.ctaCard}>
        <FiTarget className={styles.ctaIconPro} /> {/* Icono profesional blanco */}
        <div>
          <p className={styles.ctaLabel}>PRÓXIMO OBJETIVO</p>
          <p className={styles.ctaText}>Completa el cuestionario de <strong>Señalética Vial</strong> para subir tu promedio.</p>
        </div>
      </div>
    </div>
  );
};

export default Desempeños;