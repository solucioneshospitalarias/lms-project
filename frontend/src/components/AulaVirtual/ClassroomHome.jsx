import React from "react"; // Quitamos useState porque ya no usaremos modales
import { useNavigate } from "react-router-dom";
import styles from "./ClassroomHome.module.css";
import { BookOpenText, User, BookCheck, ClipboardList } from 'lucide-react';
import img1 from '../../assets/Servicios.png'
import img2 from '../../assets/CapiAtencion.png'
import img3 from '../../assets/Identidad.png'
import img4 from '../../assets/FormularioContacto.png'

const courses = [
  { id: 1, category: "Matemáticas", grade: "Periodo 1", teacher: "Walter", color: "#d93025", image: img1 },
  { id: 2, category: "Lenguaje", grade: "Periodo 2", teacher: "Samir", color: "#FFB300", image: img2 },
  { id: 3, category: "Ciencias Naturales", grade: "Periodo 3", teacher: "Jons", color: "#1e8e3e", image: img3 },
  { id: 4, category: "Ciencias Sociales", grade: "Periodo 4", teacher: "Samuel", color: "#1a73e8", image: img4 },
];

const ClassroomHome = () => {
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

            <div className={styles.instructorBadge}>
              <User size={16} color="#636e72" />
              <span>Instructor: {course.teacher}</span>
            </div>

            <button className={styles.btnAccess}>Acceder al Curso</button>

            <div className={styles.secondaryActions}>
              <button className={styles.btnOpen}>
                <BookCheck size={18} />
                Abrir
              </button>

              {/* ✅ NAVEGACIÓN LIMPIA: Esto te llevará a la pantalla completa */}
              <button
                className={styles.btnNotes}
                onClick={() => navigate("/visor-notas")}
              >
                <ClipboardList size={18} />
                Mis notas
              </button>
            </div>
          </div>

          <div className={styles.courseImageSide}>
            <img src={course.image} alt={course.category} loading="lazy" />
          </div>
        </div>
      ))}

      {/* ❌ ELIMINAMOS EL COMPONENTE VisorNotas DE AQUÍ 
          Porque ahora es una ruta independiente en App.jsx */}
    </div>
  );
};

export default ClassroomHome;