import React, { useState, useEffect } from "react";
import { FaSearch, FaBookOpen, FaTimes, FaFilePdf } from "react-icons/fa";
import styles from "./VistaCursos.module.css";
import pdf from '../../../layout/Footer/Docs/TerminosCondiciones.pdf';

const VistaCursos = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("Todos");
    const [selectedCourse, setSelectedCourse] = useState(null);

    const cursosEnrolled = [
        {
            id: 1,
            category: "Matemáticas",
            grade: "1°",
            teacher: "Prof. Walter",
            progress: 75,
            color: "#d93025",
            coverUrl: "https://i.imgur.com/JnM1HUb.png",
            pdfUrl: pdf
        },
        {
            id: 2,
            category: "Ciencias Sociales",
            grade: "1°",
            teacher: "Prof. Walter",
            progress: 75,
            color: "#d93025",
            coverUrl: "https://i.imgur.com/JnM1HUb.png",
            pdfUrl: pdf
        },
        {
            id: 3,
            category: "Lenguaje",
            grade: "1°",
            teacher: "Prof. Walter",
            progress: 75,
            color: "#d93025",
            coverUrl: "https://i.imgur.com/JnM1HUb.png",
            pdfUrl: pdf
        },
        {
            id: 4,
            category: "Ciencias Naturales",
            grade: "2°",
            teacher: "Prof. Samir",
            progress: 40,
            color: "#1e8e3e",
            coverUrl: "https://i.imgur.com/zgBoWvN.jpeg",
            pdfUrl: pdf
        },
        {
            id: 5,
            category: "Historia",
            grade: "2°",
            teacher: "Prof. Jons",
            progress: 90,
            color: "#1a73e8",
            coverUrl: "https://i.imgur.com/PgEjXoY.jpeg",
            pdfUrl: pdf
        },
        {
            id: 6,
            category: "Lenguaje",
            grade: "2°",
            teacher: "Prof. Samuel",
            progress: 10,
            color: "#FFB300",
            coverUrl: "https://i.imgur.com/NB9d5SN.jpeg",
            pdfUrl: pdf
        },
        {
            id: 7,
            category: "Inglés",
            grade: "3°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 8,
            category: "Lenguajes",
            grade: "3°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 9,
            category: "Estadisticas",
            grade: "3°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 10,
            category: "Fisica",
            grade: "4°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 11,
            category: "Historia",
            grade: "4°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 12,
            category: "Quimica",
            grade: "4°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 13,
            category: "Ciencias Naturales",
            grade: "5°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 14,
            category: "Filosofia",
            grade: "5°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 15,
            category: "Comprension Lectora",
            grade: "5°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 16,
            category: "Comprension Lectora",
            grade: "6°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 17,
            category: "Comprension Lectora",
            grade: "6°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
        {
            id: 18,
            category: "Comprension Lectora",
            grade: "6°",
            teacher: "Dra. Elena",
            progress: 60,
            color: "#8e44ad",
            coverUrl: "https://i.imgur.com/T8OoGqM.jpeg",
            pdfUrl: pdf
        },
    ];

    const uniqueGrades = ["Todos", ...new Set(cursosEnrolled.map(c => c.grade))].sort();

    const handleOpenBook = (curso) => {
        setSelectedCourse(curso);
    };

    // Lógica de filtrado (Materia o Profesor)
    // Lógica de filtrado avanzada
    const coursesFiltered = cursosEnrolled.filter((curso) => {
        const matchesGrade = selectedGrade === "Todos" || curso.grade === selectedGrade;
        const matchesSearch =
            curso.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.teacher.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesGrade && matchesSearch;
    });

    // --- LÓGICA SENIOR: Agrupar cursos por Grado ---
    const gradesGrouped = coursesFiltered.reduce((groups, curso) => {
        const grade = curso.grade;
        if (!groups[grade]) groups[grade] = [];
        groups[grade].push(curso);
        return groups;
    }, {});

    const sortedGrades = Object.keys(gradesGrouped).sort();

    useEffect(() => {
        if (selectedCourse) {
            document.body.style.overflow = "hidden";

            // Usamos un pequeño delay para asegurar que el iframe ya cargó en el DOM
            const timer = setTimeout(() => {
                const modalContent = document.querySelector(`.${styles.modalContent}`);
                const pdfContainer = document.querySelector(`.${styles.pdfViewerContainer}`);

                if (modalContent) modalContent.scrollTop = 0;
                if (pdfContainer) pdfContainer.scrollTop = 0;

                // Forzar el foco al inicio del modal
                window.scrollTo(0, 0);
            }, 10);

            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedCourse]);

    return (
        <div className={`${styles.libraryContainer} fadeUpEffect`}>
            <h1 className={styles.libraryTitle}>Mi Biblioteca Digital</h1>

            <div className={styles.filterSection}>
                <div className={styles.selectWrapper}>
                    <select
                        className={styles.gradeSelect}
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                        {uniqueGrades.map(grade => (
                            <option key={grade} value={grade}>
                                {grade === "Todos" ? "Todos los Grados" : `${grade} Grado`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.searchBarContainer}>
                    <FaSearch className={styles.searchBarIcon} />
                    <input
                        type="text"
                        placeholder="Buscar materia..."
                        className={styles.searchBarInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {sortedGrades.length > 0 ? (
                sortedGrades.map((grade) => (
                    <div key={grade} className={styles.gradeShelfSection}>
                        <div className={styles.gradeBadgeWood}>
                            <span>{grade} Grado</span>
                        </div>
                        <div className={styles.shelfFullWrapper}>
                            <div className={styles.booksOnShelf}>
                                {gradesGrouped[grade].map((curso) => (
                                    <div
                                        key={curso.id}
                                        className={styles.premiumBookContainer}
                                        onClick={() => setSelectedCourse(curso)}
                                    >
                                        <div className={styles.premiumBook} style={{ '--book-accent-color': curso.color }}>
                                            <div className={styles.bookHardCover}>
                                                <img src={curso.coverUrl} alt="Portada" className={styles.bookCoverImage} />
                                                <div className={styles.bookSpine}></div>
                                                <FaBookOpen className={styles.openBookIcon} />
                                            </div>
                                            <div className={styles.bookProgressBadge}>{curso.progress}%</div>
                                        </div>
                                        <p className={styles.subjectLabel}>{curso.category}</p>
                                        <p className={styles.teacherLabel}>{curso.teacher}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.shelfBaseWood}>
                                <div className={styles.shelfWoodFront}></div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.noResultsLibrary}>No se encontraron materias.</p>
            )}

            {/* MODAL */}
            {selectedCourse && (
                <div className={styles.modalOverlay} onClick={() => setSelectedCourse(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader} style={{ borderTop: `6px solid ${selectedCourse.color}` }}>
                            <h3 style={{ color: selectedCourse.color }}>
                                <FaFilePdf /> {selectedCourse.category} - {selectedCourse.grade}
                            </h3>
                            <button className={styles.closeBtn} onClick={() => setSelectedCourse(null)} style={{ '--hover-color': selectedCourse.color }}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.pdfViewerContainer}>
                            <iframe
                                src={`${selectedCourse.pdfUrl}#page=1`}
                                width="100%" height="100%" title="Visor PDF"
                                style={{ border: 'none', position: 'absolute', top: 0, left: 0 }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VistaCursos;