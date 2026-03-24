// Componente atómico — sin estilos externos, todo inline por su naturaleza SVG

const ProgressRing = ({ value, color, size = 48 }) => {
    const radius = (size - 6) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = (value / 100) * circumference;

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke="#e9ecef" strokeWidth="4"
            />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={`${dashOffset} ${circumference}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 1s ease' }}
            />
        </svg>
    );
};

export default ProgressRing;