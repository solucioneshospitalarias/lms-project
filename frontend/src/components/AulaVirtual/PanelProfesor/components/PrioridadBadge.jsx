// Componente atómico — badge de prioridad para tareas

const CONFIG_PRIORIDAD = {
    alta: { label: 'Alta', color: '#c22821', bg: '#fff0ef' },
    media: { label: 'Media', color: '#e07b00', bg: '#fff8ed' },
    baja: { label: 'Baja', color: '#48b358', bg: '#edfaf1' },
};

const PrioridadBadge = ({ nivel }) => {
    const cfg = CONFIG_PRIORIDAD[nivel] ?? CONFIG_PRIORIDAD.baja;
    return (
        <span style={{
            background: cfg.bg,
            color: cfg.color,
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 20,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
        }}>
            {cfg.label}
        </span>
    );
};

export default PrioridadBadge;