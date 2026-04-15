import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importante para navegar
import { X, FileText, ArrowLeft } from "lucide-react";
import styles from "./VisorNotas.module.css";
import pdfFile from "../../AulaVirtual/PanelProfesor/PDFS/0-P1-GPSV-Grado Transición.pdf";

const VisorNotas = () => {
    const navigate = useNavigate();
    const [unidadActiva, setUnidadActiva] = useState(1);

    const pdfs = {
        1: pdfFile,
        2: pdfFile,
        3: pdfFile,
        4: pdfFile,
    };

    return (
        <div className={styles.pageContainer}>
            <aside className={styles.sidebar}>
                {/* Botón para volver al Aula Virtual */}
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Volver
                </button>

                <div className={styles.sidebarHeader}>
                    <FileText size={20} />
                    <span>Unidades</span>
                </div>

                <div className={styles.tabsContainer}>
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`${styles.tabBtn} ${unidadActiva === num ? styles.activeTab : ""}`}
                            onClick={() => setUnidadActiva(num)}
                        >
                            U{num}
                        </button>
                    ))}
                </div>

                <nav className={styles.indiceSimulado}>
                    <p>Contenido Unidad {unidadActiva}</p>
                    <ul>
                        <li>Introducción</li>
                        <li>Desarrollo del tema</li>
                        <li>Consecuencias</li>
                    </ul>
                </nav>
            </aside>

            <main className={styles.viewerMain}>
                <header className={styles.viewerHeader}>
                    <span>Visualizando: Unidad {unidadActiva}</span>
                    <button onClick={() => navigate(-1)} className={styles.btnClose}>
                        <X size={24} />
                    </button>
                </header>

                <div className={styles.pdfWrapper}>
                    <iframe
                        src={`${pdfs[unidadActiva]}#toolbar=0&navpanes=0&view=FitH`}
                        title="Contenido de la Unidad"
                        className={styles.pdfIframe}
                    />
                </div>
            </main>
        </div>
    );
};

export default VisorNotas;