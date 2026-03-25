import styles from './VistaGrupos.module.css';

const VistaGrupos = ({ grados, setActiveTab, setGradoSeleccionado }) => {

    const handleDetalle = (grado) => {
        setGradoSeleccionado(grado);
        setActiveTab('detalle');
    };

    return (
        <div className={styles.vista}>

            <div className={styles.vistaHeader}>
                <h2>Mis Grupos Asignados</h2>
                <span>{grados.length} grupos activos</span>
            </div>

            <div className={styles.gruposGrid}>
                {grados.map((g, i) => (
                    <div key={g.id} className={styles.grupoCard} style={{ animationDelay: `${i * 80}ms` }}>

                        {/* Cabecera coloreada */}
                        <div className={styles.cardHeader} style={{ background: `linear-gradient(135deg, ${g.color}, ${g.color}cc)` }}>
                            <div className={styles.cardHeaderIcon}>{g.icon}</div>
                            <div>
                                <h3>{g.nombre}</h3>
                                <p>{g.area}</p>
                            </div>
                        </div>

                        <div className={styles.cardBody}>

                            {/* Estadísticas */}
                            <div className={styles.statsRow}>
                                <div className={styles.stat}><span>{g.estudiantes}</span><small>Estudiantes</small></div>
                                <div className={styles.stat}><span>{g.guias}</span><small>Guías</small></div>
                                <div className={styles.stat}><span>{g.completadas}</span><small>Completadas</small></div>
                            </div>

                            {/* Barra progreso */}
                            <div className={styles.progresoBarra}>
                                <div className={styles.progresoFill} style={{ width: `${g.progreso}%`, background: g.color }} />
                            </div>
                            <div className={styles.progresoLabel}>
                                <span>Progreso del bimestre</span>
                                <span style={{ color: g.color, fontWeight: 700 }}>{g.progreso}%</span>
                            </div>

                            {/* Próxima actividad */}
                            <div className={styles.proximaAct}>
                                <span className={styles.proximaLabel}>Próxima actividad</span>
                                <span className={styles.proximaTexto}>{g.proximaActividad}</span>
                            </div>

                            {/* CTA */}
                            <button
                                className={styles.btnGestionar}
                                style={{ '--color': g.color }}
                                onClick={() => handleDetalle(g)}
                            >
                                Gestionar Grado →
                            </button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default VistaGrupos;