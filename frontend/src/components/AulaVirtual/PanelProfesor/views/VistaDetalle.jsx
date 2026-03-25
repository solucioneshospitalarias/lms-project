import styles from './VistaDetalle.module.css';

// Mock de estudiantes — en producción vendría filtrado por gradoId desde la API
const generarEstudiantes = (grado) => {
    const nombres = ['Laura Martínez', 'Carlos Pérez', 'Ana Gómez', 'David López', 'Sofía Ruiz', 'Mateo Torres', 'Valentina Cruz', 'Andrés Jiménez'];
    const progresos = [88, 45, 92, 67, 78, 55, 95, 40];
    return nombres.map((nombre, i) => ({
        id: i + 1,
        nombre,
        progreso: progresos[i],
        estado: progresos[i] > 70 ? 'Al día' : 'Requiere atención',
    }));
};

const VistaDetalle = ({ grado, setActiveTab }) => {
    if (!grado) return null;

    const estudiantes = generarEstudiantes(grado);

    return (
        <div className={styles.vista}>

            {/* Botón volver */}
            <button className={styles.btnVolver} onClick={() => setActiveTab('grupos')}>
                ← Volver a Grupos
            </button>

            {/* Header del grado */}
            <div className={styles.detalleHeader} style={{ background: `linear-gradient(135deg, ${grado.color}, ${grado.color}aa)` }}>
                <div className={styles.headerIcon}>{grado.icon}</div>
                <div className={styles.headerTexto}>
                    <h2>{grado.nombre}</h2>
                    <p>{grado.area} · {grado.estudiantes} estudiantes</p>
                </div>
                <div className={styles.headerKpis}>
                    <div className={styles.headerKpi}><span>{grado.guias}</span><small>Guías</small></div>
                    <div className={styles.headerKpi}><span>{grado.completadas}</span><small>Completadas</small></div>
                    <div className={styles.headerKpi}><span>{grado.progreso}%</span><small>Progreso</small></div>
                </div>
            </div>

            {/* Contenido en 2 columnas */}
            <div className={styles.dosCol}>

                {/* Tabla de estudiantes */}
                <div className={styles.bloque}>
                    <div className={styles.bloqueHeader}><h2>Estudiantes</h2></div>
                    <div className={styles.tablaHeader}>
                        <span>Nombre</span><span>Progreso</span><span>Estado</span>
                    </div>
                    {estudiantes.map((e) => (
                        <div key={e.id} className={styles.tablaFila}>
                            <div className={styles.estudianteNombre}>
                                <div className={styles.avatar} style={{ background: grado.colorSoft, color: grado.color }}>
                                    {e.nombre.split(' ').map(p => p[0]).join('').slice(0, 2)}
                                </div>
                                <span>{e.nombre}</span>
                            </div>
                            <div className={styles.estudianteBar}>
                                <div className={styles.barBg}>
                                    <div className={styles.barFill} style={{ width: `${e.progreso}%`, background: e.progreso > 70 ? '#48b358' : '#c22821' }} />
                                </div>
                                <span>{e.progreso}%</span>
                            </div>
                            <span className={`${styles.estadoBadge} ${e.progreso > 70 ? styles.bien : styles.alerta}`}>
                                {e.estado}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Lista de guías */}
                <div className={styles.bloque}>
                    <div className={styles.bloqueHeader}><h2>Guías Pedagógicas</h2></div>
                    {Array.from({ length: grado.guias }, (_, i) => {
                        const finalizada = i < grado.completadas;
                        const pct = finalizada ? 100 : 30 + i * 15;
                        return (
                            <div key={i} className={styles.guiaItem}>
                                <div className={styles.guiaIcon} style={{ background: grado.colorSoft, color: grado.color }}>📄</div>
                                <div style={{ flex: 1 }}>
                                    <span className={styles.guiaTitulo}>Guía #{i + 1} — Unidad {i + 1}</span>
                                    <div className={styles.guiaBarra}>
                                        <div className={styles.guiaBarBg}>
                                            <div className={styles.guiaBarFill} style={{ width: `${pct}%`, background: finalizada ? '#48b358' : grado.color }} />
                                        </div>
                                        <span>{pct}%</span>
                                    </div>
                                </div>
                                <span className={`${styles.guiaEstado} ${finalizada ? styles.guiaFin : styles.guiaCurso}`}>
                                    {finalizada ? 'Finalizada' : 'En curso'}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default VistaDetalle;