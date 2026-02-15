import React from "react";
import styles from "./Estadisticas.module.css";
import { Users, BookOpen, Layout, Award } from "lucide-react"; // Iconos elegantes

const Estadisticas = () => {
  return (
    <div className={styles.statsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>Panel de Control</span>
          <h1 className={styles.mainTitle}>
            Impacto en la <span>Educación Vial</span>
          </h1>
          <p className={styles.description}>
            Visualiza el progreso y los resultados de nuestra plataforma
            interactiva en tiempo real.
          </p>
        </header>

        <div className={styles.statsGrid}>
          {/* Tarjeta 1 */}
          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.blue}`}>
              <Users size={24} />
            </div>
            <div className={styles.cardInfo}>
              <h3>+5,400</h3>
              <p>Estudiantes Activos</p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.red}`}>
              <BookOpen size={24} />
            </div>
            <div className={styles.cardInfo}>
              <h3>120</h3>
              <p>Cursos Completados</p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.gray}`}>
              <Layout size={24} />
            </div>
            <div className={styles.cardInfo}>
              <h3>85</h3>
              <p>Componentes LOM</p>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.gold}`}>
              <Award size={24} />
            </div>
            <div className={styles.cardInfo}>
              <h3>98%</h3>
              <p>Satisfacción Total</p>
            </div>
          </div>
        </div>

        {/* Sección decorativa suave */}
        <div className={styles.chartPlaceholder}>
          <p>Gráfica de crecimiento mensual (Simulación)</p>
          <div className={styles.barContainer}>
            <div className={styles.bar} style={{ height: "40%" }}></div>
            <div className={styles.bar} style={{ height: "70%" }}></div>
            <div className={styles.bar} style={{ height: "55%" }}></div>
            <div className={styles.bar} style={{ height: "90%" }}></div>
            <div className={styles.bar} style={{ height: "65%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
