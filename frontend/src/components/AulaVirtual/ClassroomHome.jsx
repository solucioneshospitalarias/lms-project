import React from "react";
import styles from "./ClassroomHome.module.css";
import { BookOpenText, User, BookCheck, ClipboardList } from 'lucide-react';
import img1 from '../../assets/Servicios.png'
import img2 from '../../assets/CapiAtencion.png'
import img3 from '../../assets/Identidad.png'
import img4 from '../../assets/FormularioContacto.png'

const courses = [
  {
    id: 1,
    category: "Matemáticas",
    grade: "Grado 9",
    teacher: "Walter",
    color: "#d93025",
    image: img1
  },
  {
    id: 2,
    category: "Lenguaje",
    grade: "Grado 9",
    teacher: "Samir",
    color: "#FFB300",
    image: img2
  },
  {
    id: 3,
    category: "Ciencias Naturales",
    grade: "Grado 9",
    teacher: "Jons",
    color: "#1e8e3e",
    image: img3
  },
  {
    id: 4,
    category: "Ciencias Sociales",
    grade: "Grado 9",
    teacher: "Samuel",
    color: "#1a73e8",
    image: img4
  },
];

const ClassroomHome = () => {
  return (
    <div className={styles.classroomGrid}>
      {courses.map((course, index) => (
        <div
          key={course.id}
          className={`${styles.studentCard} fadeUpEffect`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* --- SECCIÓN IZQUIERDA: Información del Curso --- */}
          <div className={styles.courseInfoSide}>
            <div className={styles.badge} style={{ backgroundColor: course.color + '20', color: course.color }}>
              <BookOpenText size={16} />
              {course.category}
            </div>

            <h3>{course.grade}</h3>

            {/* Instructor */}
            <div className={styles.instructorBadge}>
              <User size={16} color="#636e72" />
              <span>Instructor: {course.teacher}</span>
            </div>

            {/* Botón Principal Acceder */}
            <button className={styles.btnAccess}>Acceder al Curso</button>

            {/* Botones Secundarios: Abrir y Mis notas */}
            <div className={styles.secondaryActions}>
              <button className={styles.btnOpen}>
                <BookCheck size={18} />
                Abrir
              </button>
              <button className={styles.btnNotes}>
                <ClipboardList size={18} />
                Mis notas
              </button>
            </div>
          </div>

          {/* --- SECCIÓN DERECHA: Imagen de Inmersión --- */}
          <div className={styles.courseImageSide}>
            <img
              src={course.image}
              alt={`Imagen de inmersión para Grado 9 ${course.category}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassroomHome;