import styles from './VistaAnalitica.module.css';

const VistaAnalitica = ({ grados }) => {

    const indicadores = [
        { label: 'Total Estudiantes', valor: grados.reduce((s, g) => s + g.estudiantes, 0), icon: '👥', color: '#002147', bg: '#eef1f7' },
        { label: 'Guías Publicadas', valor: grados.reduce((s, g) => s + g.guias, 0), icon: '📚', color: '#48b358', bg: '#edfaf1' },
        { label: 'Guías Completadas', valor: grados.reduce((s, g) => s + g.completadas, 0), icon: '✅', color: '#e07b00', bg: '#fff8ed' },
        {
            label: 'Progreso Global',
            valor: `${Math.round(grados.reduce((s, g) => s + g.progreso, 0) / grados.length)}%`,
            icon: '📈', color: '#c22821', bg: '#fff0ef',
        },
    ];

    return (
        <div className={styles.vista}>

            <div className={styles.vistaHeader}>
                <h2>Analítica Académica</h2>
                <span>Bimestre actual · 2025</span>
            </div>

            <div className={styles.dosCol}>

                {/* Gráfico de barras CSS */}
                <div className={styles.bloque}>
                    <div className={styles.bloqueHeader}><h2>Progreso por Grado</h2></div>
                    <div className={styles.chartBarras}>
                        {grados.map((g) => (
                            <div key={g.id} className={styles.barraCol}>
                                <span className={styles.barraPct}>{g.progreso}%</span>
                                <div className={styles.barraWrap}>
                                    <div
                                        className={styles.barraFill}
                                        style={{ height: `${(g.progreso / 100) * 160}px`, background: g.color }}
                                    />
                                </div>
                                <span className={styles.barraLabel}>{g.nombre}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resumen bimestral */}
                <div className={styles.bloque}>
                    <div className={styles.bloqueHeader}><h2>Resumen Bimestral</h2></div>
                    {grados.map((g) => (
                        <div key={g.id} className={styles.resumenFila}>
                            <div className={styles.resumenInfo}>
                                <span className={styles.resumenIcon}>{g.icon}</span>
                                <div>
                                    <span className={styles.resumenNombre}>{g.nombre}</span>
                                    <span className={styles.resumenSub}>{g.estudiantes} estudiantes</span>
                                </div>
                            </div>
                            <div className={styles.resumenBarra}>
                                <div className={styles.resumenBarFill} style={{ width: `${g.progreso}%`, background: g.color }} />
                            </div>
                            <span className={styles.resumenPct} style={{ color: g.color }}>{g.progreso}%</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Indicadores globales */}
            <div className={styles.bloque}>
                <div className={styles.bloqueHeader}><h2>Indicadores Globales</h2></div>
                <div className={styles.indicadoresGrid}>
                    {indicadores.map((k, i) => (
                        <div key={i} className={styles.indicadorCard}>
                            <div className={styles.indicadorIcon} style={{ background: k.bg, color: k.color }}>{k.icon}</div>
                            <div>
                                <span className={styles.indicadorValor} style={{ color: k.color }}>{k.valor}</span>
                                <span className={styles.indicadorLabel}>{k.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default VistaAnalitica;