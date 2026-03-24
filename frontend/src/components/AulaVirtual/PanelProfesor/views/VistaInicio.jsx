import styles from './VistaInicio.module.css';
import ProgressRing   from '../components/ProgressRing';
import PrioridadBadge from '../components/PrioridadBadge';
import { ACTIVIDAD_RECIENTE, TAREAS_PENDIENTES } from '../constants/Data';

const VistaInicio = ({ grados, setActiveTab, setGradoSeleccionado }) => {

  const totalEstudiantes = grados.reduce((s, g) => s + g.estudiantes, 0);
  const promedioProgreso = Math.round(grados.reduce((s, g) => s + g.progreso, 0) / grados.length);
  const tareasHoy        = TAREAS_PENDIENTES.filter(t => t.vence === 'Hoy').length;
  const totalGuias       = grados.reduce((s, g) => s + g.guias, 0);

  const kpis = [
    { label: 'Estudiantes',      valor: totalEstudiantes,       icon: '👥', color: '#002147', bg: '#eef1f7', delta: '+2 esta semana'          },
    { label: 'Progreso Promedio',valor: `${promedioProgreso}%`, icon: '📊', color: '#48b358', bg: '#edfaf1', delta: '+5% vs bimestre ant.'     },
    { label: 'Tareas para Hoy',  valor: tareasHoy,              icon: '📌', color: '#c22821', bg: '#fff0ef', delta: `${TAREAS_PENDIENTES.length} total` },
    { label: 'Guías Activas',    valor: totalGuias,             icon: '📚', color: '#e07b00', bg: '#fff8ed', delta: 'En todos los grados'      },
  ];

  const handleGrado = (grado) => {
    setGradoSeleccionado(grado);
    setActiveTab('detalle');
  };

  return (
    <div className={styles.vista}>

      {/* ── KPIs ── */}
      <div className={styles.kpiGrid}>
        {kpis.map((k, i) => (
          <div key={i} className={styles.kpiCard} style={{ animationDelay: `${i * 80}ms` }}>
            <div className={styles.kpiIcon} style={{ background: k.bg, color: k.color }}>
              {k.icon}
            </div>
            <div className={styles.kpiTexto}>
              <span className={styles.kpiValor} style={{ color: k.color }}>{k.valor}</span>
              <span className={styles.kpiLabel}>{k.label}</span>
              <span className={styles.kpiDelta}>{k.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mis Grados + Actividad Reciente ── */}
      <div className={styles.dosCol}>

        {/* Grados */}
        <div className={styles.bloque}>
          <div className={styles.bloqueHeader}>
            <h2>Mis Grados</h2>
            <button className={styles.btnVerTodo} onClick={() => setActiveTab('grupos')}>Ver todos →</button>
          </div>
          <div className={styles.gradosLista}>
            {grados.map((g) => (
              <div key={g.id} className={styles.gradoFila} onClick={() => handleGrado(g)}>
                <div className={styles.gradoIcon} style={{ background: g.colorSoft, color: g.color }}>
                  {g.icon}
                </div>
                <div className={styles.gradoInfo}>
                  <span className={styles.gradoNombre}>{g.nombre}</span>
                  <span className={styles.gradoSub}>{g.estudiantes} estudiantes · {g.guias} guías</span>
                </div>
                <div className={styles.gradoRing}>
                  <ProgressRing value={g.progreso} color={g.color} size={44} />
                  <span className={styles.gradoPct} style={{ color: g.color }}>{g.progreso}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad */}
        <div className={styles.bloque}>
          <div className={styles.bloqueHeader}>
            <h2>Actividad Reciente</h2>
            <span className={styles.badgeLive}>● EN VIVO</span>
          </div>
          <div className={styles.actividadLista}>
            {ACTIVIDAD_RECIENTE.map((a) => (
              <div key={a.id} className={styles.actividadItem}>
                <div className={styles.actividadIcon} style={{ background: a.color + '18', color: a.color }}>
                  {a.icon}
                </div>
                <div className={styles.actividadTexto}>
                  <span>{a.texto}</span>
                  <small>{a.tiempo}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Tareas Pendientes ── */}
      <div className={styles.bloque}>
        <div className={styles.bloqueHeader}>
          <h2>Tareas Pendientes</h2>
          <span className={styles.contadorBadge}>{TAREAS_PENDIENTES.length}</span>
        </div>
        <div className={styles.tareasGrid}>
          {TAREAS_PENDIENTES.map((t) => (
            <div key={t.id} className={styles.tareaCard}>
              <div className={styles.tareaTop}>
                <PrioridadBadge nivel={t.prioridad} />
                <span className={styles.tareaVence}>Vence: {t.vence}</span>
              </div>
              <p className={styles.tareaTitulo}>{t.titulo}</p>
              <span className={styles.tareaGrado}>{t.grado}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default VistaInicio;