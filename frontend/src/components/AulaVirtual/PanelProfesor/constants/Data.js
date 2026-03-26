export const PROFESOR = {
    nombre: 'SR. WALTER',
    iniciales: 'W',
    rol: 'Desarrollador de Software', 
    correo: 'walter@rutasdelsaber.com',
    foto: null,
};

export const GRADOS = [
    {
        id: 1,
        nombre: 'Sexto A',
        area: 'Ciencias Naturales',
        estudiantes: 34,
        guias: 4,
        completadas: 2,
        proximaActividad: 'Entrega guía #3 — Ecosistemas',
        fechaProxima: '2025-07-18',
        color: '#c22821',
        colorSoft: '#fff0ef',
        icon: '🧪',
        progreso: 68,
    },
    {
        id: 2,
        nombre: 'Séptimo B',
        area: 'Ciencias Naturales',
        estudiantes: 30,
        guias: 3,
        completadas: 3,
        proximaActividad: 'Evaluación bimestral',
        fechaProxima: '2025-07-22',
        color: '#48b358',
        colorSoft: '#edfaf1',
        icon: '🌱',
        progreso: 100,
    },
    {
        id: 3,
        nombre: 'Octavo C',
        area: 'Ciencias Naturales',
        estudiantes: 28,
        guias: 5,
        completadas: 1,
        proximaActividad: 'Taller laboratorio virtual',
        fechaProxima: '2025-07-15',
        color: '#002147',
        colorSoft: '#eef1f7',
        icon: '⚗️',
        progreso: 30,
    },
    {
        id: 4,
        nombre: 'Noveno A',
        area: 'Ciencias Naturales',
        estudiantes: 32,
        guias: 4,
        completadas: 2,
        proximaActividad: 'Revisión de proyectos',
        fechaProxima: '2025-07-25',
        color: '#e07b00',
        colorSoft: '#fff8ed',
        icon: '🔬',
        progreso: 50,
    },
    {
        id: 5,
        nombre: 'Noveno B',
        area: 'Ciencias Sociales',
        estudiantes: 32,
        guias: 4,
        completadas: 2,
        proximaActividad: 'Revisión de proyectos',
        fechaProxima: '2025-07-25',
        color: '#e03f00',
        colorSoft: '#fff8ed',
        icon: '🔬',
        progreso: 45,
    },
    {
        id: 6,
        nombre: 'Noveno C',
        area: 'Matématicas',
        estudiantes: 32,
        guias: 4,
        completadas: 2,
        proximaActividad: 'Revisión de proyectos',
        fechaProxima: '2025-07-25',
        color: '#0029e0',
        colorSoft: '#fff8ed',
        icon: '🔬',
        progreso: 75,
    },
];

export const ACTIVIDAD_RECIENTE = [
    { id: 1, tipo: 'entrega', texto: 'Laura M. entregó la guía #2 de Sexto A', tiempo: 'Hace 15 min', icon: '📄', color: '#48b358' },
    { id: 2, tipo: 'alerta', texto: 'Carlos P. tiene 2 actividades sin completar', tiempo: 'Hace 1 hora', icon: '⚠️', color: '#e07b00' },
    { id: 3, tipo: 'nota', texto: 'Promedio Séptimo B subió a 4.4 este bimestre', tiempo: 'Hace 2 horas', icon: '📈', color: '#002147' },
    { id: 4, tipo: 'entrega', texto: 'Juan R. entregó la guía #1 de Octavo C', tiempo: 'Hace 3 horas', icon: '📄', color: '#48b358' },
    { id: 5, tipo: 'alerta', texto: '3 estudiantes de Noveno A requieren atención', tiempo: 'Ayer', icon: '🔔', color: '#c22821' },
];

export const TAREAS_PENDIENTES = [
    { id: 1, titulo: 'Calificar guía #2 — Sexto A', grado: 'Sexto A', prioridad: 'alta', vence: 'Hoy' },
    { id: 2, titulo: 'Subir material semana 8', grado: 'Séptimo B', prioridad: 'media', vence: 'Mañana' },
    { id: 3, titulo: 'Responder foro de preguntas', grado: 'Octavo C', prioridad: 'baja', vence: 'Jul 20' },
    { id: 2, titulo: 'Revisar plan de recuperación', grado: 'Noveno A', prioridad: 'alta', vence: 'Hoy' },
];

export const NAV_ITEMS = [
    { key: 'inicio', icon: '🏠', label: 'Inicio' },
    { key: 'grupos', icon: '👥', label: 'Mis Grupos' },
    { key: 'analitica', icon: '📊', label: 'Analítica' },
];

export const TITULOS_VISTAS = {
    inicio: 'Panel Principal',
    grupos: 'Mis Grupos',
    analitica: 'Analítica Académica',
    detalle: 'Detalle de Grado',
    perfil: 'Mi Perfil de Usuario',
    configuracion: 'Configuración del Sistema'
};