import React from "react";
import styles from "./ClassroomHome.module.css";

const courses = [
  {
    id: 1,
    title: "Matemáticas 101",
    section: "Grupo A",
    teacher: "Walter",
    color: "#d93025",
  },
  {
    id: 2,
    title: "Ciencias Naturales",
    section: "Grupo B",
    teacher: "Rutas del Saber",
    color: "#1a73e8",
  },
  {
    id: 3,
    title: "Historia Universal",
    section: "Grupo C",
    teacher: "Admin",
    color: "#1e8e3e",
  },
];

const ClassroomHome = () => {
  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <div key={course.id} className={styles.card}>
          <div
            className={styles.cardHeader}
            style={{ backgroundColor: course.color }}
          >
            <h3>{course.title}</h3>
            <p>{course.section}</p>
            <span>{course.teacher}</span>
          </div>
          <div className={styles.cardBody}>
            {/* Espacio para tareas o anuncios cortos */}
          </div>
          <div className={styles.cardFooter}>
            <button className={styles.footerIcon}>📂</button>
            <button className={styles.footerIcon}>📈</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassroomHome;
