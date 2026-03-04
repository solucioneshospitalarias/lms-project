import React, { useState } from "react"; // Añadimos useState
import { FaSearch } from "react-icons/fa"; // Importamos icono de búsqueda
import styles from "./MisCursos.module.css";

const MisCursos = () => {
  // 1. Estado para el buscador
  const [searchTerm, setSearchTerm] = useState("");

  const cursosEnrolled = [
    { id: 1, name: "Matemáticas Avanzadas", prof: "Lic. Walter", progress: 75 },
    { id: 2, name: "Ciencias Naturales", prof: "Dra. Elena", progress: 40 },
    { id: 3, name: "Historia Universal", prof: "Prof. Alberto", progress: 90 },
    { id: 4, name: "Comprensión Lectora", prof: "Lic. Maria", progress: 10 },
  ];

  // 2. Lógica de filtrado
  const coursesFiltered = cursosEnrolled.filter(
    (curso) =>
      curso.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.prof.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Cursos Inscritos</h1>

      {/* 3. Contenedor del Buscador */}
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar por nombre o profesor..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.courseList}>
        {coursesFiltered.length > 0 ? (
          coursesFiltered.map((curso) => (
            <div key={curso.id} className={styles.courseItem}>
              <div className={styles.courseInfo}>
                <h3>{curso.name}</h3>
                <p>Profesor: {curso.prof}</p>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${curso.progress}%` }}
                  ></div>
                </div>
                <span>{curso.progress}% completado</span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>
            No se encontraron cursos con ese nombre.
          </p>
        )}
      </div>
    </div>
  );
};

export default MisCursos;
