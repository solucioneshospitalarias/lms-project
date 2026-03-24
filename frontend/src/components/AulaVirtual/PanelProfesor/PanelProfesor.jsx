import { useState } from 'react';
import styles from './PanelProfesor.module.css';

// ── Layout ──
import Sidebar from './components/SidebarProfesor';
import TopBar from './components/TopBar';

// ── Vistas ──
import VistaInicio from './views/VistaInicio';
import VistaGrupos from './views/VistaGrupos';
import VistaDetalle from './views/VistaDetalle';
import VistaAnalitica from './views/VistaAnalitica';

// ── Data ──
import { GRADOS, TITULOS_VISTAS } from './constants/Data';

const PanelProfesor = () => {
    const [activeTab, setActiveTab] = useState('inicio');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [gradoSeleccionado, setGradoSeleccionado] = useState(null);

    const titulo = activeTab === 'detalle' && gradoSeleccionado
        ? `Detalle — ${gradoSeleccionado.nombre}`
        : TITULOS_VISTAS[activeTab];

    return (
        <div className={`${styles.root} ${sidebarOpen ? styles.expanded : styles.collapsed}`}>

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(v => !v)}
            />

            <main className={styles.main}>
                <TopBar titulo={titulo} />

                <div className={styles.contenido} key={activeTab}>
                    {activeTab === 'inicio' && (
                        <VistaInicio
                            grados={GRADOS}
                            setActiveTab={setActiveTab}
                            setGradoSeleccionado={setGradoSeleccionado}
                        />
                    )}
                    {activeTab === 'grupos' && (
                        <VistaGrupos
                            grados={GRADOS}
                            setActiveTab={setActiveTab}
                            setGradoSeleccionado={setGradoSeleccionado}
                        />
                    )}
                    {activeTab === 'detalle' && (
                        <VistaDetalle
                            grado={gradoSeleccionado}
                            setActiveTab={setActiveTab}
                        />
                    )}
                    {activeTab === 'analitica' && (
                        <VistaAnalitica grados={GRADOS} />
                    )}
                </div>
            </main>

        </div>
    );
};

export default PanelProfesor;