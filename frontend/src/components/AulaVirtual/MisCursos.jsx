import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MisCursos.module.css";
import { BookOpenText, BookCheck } from 'lucide-react';
import img1 from '../../assets/Servicios.png'
import img2 from '../../assets/Item2.png'
import img3 from '../../assets/Identidad.png'
import img4 from '../../assets/FormularioContacto.png'

const courses = [
  {
    id: 1,
    category: "Periodo 1",
    grade: "Regla de Colores",
    descripcion: 'Asumir la regulación',
    color: "#d93025",
    image: img1
  },
  {
    id: 2,
    category: "Periodo 2",
    grade: "¿Quién me cuida?",
    descripcion: 'Corresponsabilidad vial',
    color: "#FFB300",
    image: img2
  },
  {
    id: 3,
    category: "Periodo 3",
    grade: "Mi Cuerpo es Frágil",
    descripcion: 'Valoración de Riesgos',
    color: "#1e8e3e",
    image: img3
  },
  {
    id: 4,
    category: "Periodo 4",
    grade: "Conocer mi Camino y Reglas para Viajar",
    descripcion: 'Comprensión del entorno y Movilidad del Idónea',
    color: "#1a73e8",
    image: img4
  },
];

const MisCursos = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.classroomGrid}>
      {courses.map((course, index) => (
        <div
          key={course.id}
          className={`${styles.studentCard} fadeUpEffect`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={styles.courseInfoSide}>
            <div className={styles.badge} style={{ backgroundColor: course.color + '20', color: course.color }}>
              <BookOpenText size={16} />
              {course.category}
            </div>

            <h3>{course.grade}</h3>

            <p className={styles.courseDescripcion}>
              {course.descripcion}
            </p>

            <div className={styles.actionsContainer}>
              <button className={styles.btnAccess}>
                Acceder al Curso
              </button>

              <button className={styles.btnOpen} onClick={() => navigate("/visor-notas")}>
                <BookCheck size={18} />
                Abrir
              </button>
            </div>
          </div>

          <div className={styles.courseImageSide}>
            <img src={course.image} alt={course.category} loading="lazy" />
          </div>
        </div>
      ))}

    </div>
  );
};

export default MisCursos;