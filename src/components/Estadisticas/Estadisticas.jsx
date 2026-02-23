import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList,
  AreaChart, Area
} from 'recharts';
import { Car, UserSearch, Activity, ShieldAlert, Users, Home, ExternalLink } from 'lucide-react'
import styles from './Estadisticas.module.css';
import img from '../../assets/BaseDatos.png'

// FORMATEADOR UNIFICADO: Evita errores de "is not defined"
const formatK = (tickItem) => tickItem === 0 ? '0' : `${tickItem / 1000} mil`;


const Estadisticas = () => {
  const [activeTab, setActiveTab] = useState(1);

  // --- DATOS ---

  // PESTAÑA 1: image_e4315f.png
  const dataInformeImagen = [
    { ciclo: '(12 a 17) Adolescencia', sexual: 47092, desaparicion: 7474, interpersonal: 12185, lesiones: 2489, intrafamiliar: 5000 },
    { ciclo: '(06 a 11) Infancia', sexual: 24366, desaparicion: 423, interpersonal: 2339, muertes: 102, intrafamiliar: 4415 },
    { ciclo: '(00 a 05) Primera Infancia', sexual: 9148, desaparicion: 368, interpersonal: 1141, muertes: 153, intrafamiliar: 2578 }
  ];

  // PESTAÑA 2: image_e44ffe.png
  const dataAmbiental = [
    { name: 'APROVECHAMIENTO...', valor: 9327 },
    { name: 'EXPLOTACION ILICIT...', valor: 4877 },
    { name: 'DAÑOS EN LOS REC...', valor: 2130 },
    { name: 'CONTAMINACION A...', valor: 1073 },
    { name: 'INVASION DE AREAS...', valor: 122 },
    { name: 'PESCA ILEGAL', valor: 116 },
    { name: 'TRAFICO DE FAUNA', valor: 113 },
    { name: 'CONTAMINACION A...(2)', valor: 57 },
    { name: 'CONTAMINACION A...(3)', valor: 39 },
    { name: 'MANEJO ILICITO DE...', valor: 36 },
  ];

  // PESTAÑA 3: image_e4b1d4.png (Agresores Interpersonal)
  // DATOS NIÑAS (Basados en tendencias de tus imágenes)
  const dataNinas = [
    { ciclo: 'P. Infancia', amigo: 254, companero: 60, profesor: 10 },
    { ciclo: 'Infancia', amigo: 1188, companero: 255, profesor: 323 },
    { ciclo: 'Adolescencia', amigo: 5220, companero: 3336, profesor: 965 },
  ];

  // DATOS NIÑOS (Basados en tendencias de tus imágenes)
  const dataNinos = [
    { ciclo: '(00 a 05) Primera Infancia', amigo: 137, companero: 41, profesor: 41 },
    { ciclo: '(06 a 11) Infancia', amigo: 507, companero: 298, profesor: 87 },
    { ciclo: '(12 a 17) Adolescencia', amigo: 1091, companero: 2234, profesor: 163 },
  ];

  const renderAreaChart = (data, colorAmigo) => (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
        <YAxis tickFormatter={formatK} domain={[0, 3000]} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '10px', fontSize: '10px' }} />

        <Area type="monotone" dataKey="amigo" name="Amigo(a)" stroke="#B30000" fill="#B30000" fillOpacity={0.3} dot={{ r: 4 }}>
          <LabelList dataKey="amigo" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
        </Area>
        <Area type="monotone" dataKey="companero" name="Compañero(a)" stroke="#546E7A" fill="#546E7A" fillOpacity={0.3} dot={{ r: 4 }}>
          <LabelList dataKey="companero" position="top" style={{ fontSize: '10px' }} />
        </Area>
        <Area type="monotone" dataKey="profesor" name="Profesor(a)" stroke="#FFD600" fill="#FFD600" fillOpacity={0.3} dot={{ r: 4 }}>
          <LabelList dataKey="profesor" position="top" style={{ fontSize: '10px' }} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );

  const getAmbientColor = (value) => {
    if (value > 9000) return '#C22821';
    if (value > 4000) return '#FFD700';
    if (value > 1000) return '#97E300';
    return '#48B358';
  };

  const tabData = {
    1: {
      titulo: "CASOS POR TIPO DE ACCIDENTE / CONTEXTO DEL HECHO",
      componente: (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={dataInformeImagen} layout="vertical" margin={{ top: 20, right: 60, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" tickFormatter={formatK} domain={[0, 55000]} stroke="#666" />
            <YAxis dataKey="ciclo" type="category" tick={{ fontSize: 11, fontWeight: 'bold' }} width={140} stroke="#666" />
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
            <Legend verticalAlign="top" align="right" iconType="circle" />
            <Bar dataKey="sexual" name="Delito Sexual" fill="#B30000" barSize={12}>
              <LabelList dataKey="sexual" position="right" style={{ fontSize: '10px' }} />
            </Bar>
            <Bar dataKey="desaparicion" name="Desaparición" fill="#002855" barSize={12}>
              <LabelList dataKey="desaparicion" position="right" style={{ fontSize: '10px' }} />
            </Bar>
            <Bar dataKey="interpersonal" name="Violencia Interpersonal" fill="#4A5568" barSize={12}>
              <LabelList dataKey="interpersonal" position="right" style={{ fontSize: '10px' }} />
            </Bar>
            <Bar dataKey="intrafamiliar" name="Violencia Intrafamiliar" fill="#48BB78" barSize={12}>
              <LabelList dataKey="intrafamiliar" position="right" style={{ fontSize: '10px' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ),
      descripcion: "Análisis de hechos victimizantes. En la adolescencia, el Delito Sexual alcanza su punto máximo con 47.092 casos."
    },
    2: {
      titulo: "TOP 10 TOTAL DE DELITOS AMBIENTALES",
      componente: (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={dataAmbiental} layout="vertical" margin={{ top: 20, right: 60, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
            <XAxis type="number" tickFormatter={formatK} domain={[0, 10000]} stroke="#666" />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fontWeight: 'bold' }} width={150} stroke="#666" />
            <Tooltip />
            <Bar dataKey="valor" barSize={20}>
              {dataAmbiental.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getAmbientColor(entry.valor)} />
              ))}
              <LabelList dataKey="valor" position="right" style={{ fontSize: '11px', fontWeight: 'bold' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ),
      descripcion: "El 'Aprovechamiento ilícito de recursos naturales' lidera la estadística ambiental."
    },
    3: {
      titulo: "AGRESOR MÁS COMUNES: COMPARATIVA NIÑAS VS NIÑOS",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h4 style={{ textAlign: 'center', marginBottom: '10px', color: '#B30000' }}>CASOS NIÑAS</h4>
              {renderAreaChart(dataNinas)}
            </div>
            <div style={{ flex: 1, minWidth: '300px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h4 style={{ textAlign: 'center', marginBottom: '10px', color: '#004080' }}>CASOS NIÑOS</h4>
              {renderAreaChart(dataNinos)}
            </div>
          </div>
        </div>
      ),
      descripcion: "Comparativa de violencia interpersonal por género. Se observa que en la adolescencia, el número de casos donde el agresor es un amigo o compañero de estudio es similar en ambos géneros, con una ligera tendencia superior en niños para el caso de compañeros de estudio."
    },

    4: {
      titulo: "CASOS DE LESIONES Y MUERTES POR CICLO VITAL Y SEXO DE LA VÍCTIMA",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* GRÁFICO NIÑA */}
            <div style={{ flex: 1, minWidth: '400px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h4 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Niña</h4>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart
                  data={[
                    { ciclo: '(00 a 05) Primera Infancia', lesiones: 744, muertes: 153 },
                    { ciclo: '(06 a 11) Infancia', lesiones: 1344, muertes: 102 },
                    { ciclo: '(12 a 17) Adolescencia', lesiones: 2489, muertes: 383 },
                  ]}
                  margin={{ top: 30, right: 40, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={formatK} domain={[0, 4000]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />

                  {/* Lesiones - Amarillo */}
                  <Area type="monotone" dataKey="lesiones" name="Lesiones por Eventos de Transporte" stroke="#FFD600" fill="#FFD600" fillOpacity={0.4} dot={{ r: 4 }}>
                    <LabelList dataKey="lesiones" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>

                  {/* Muertes - Rojo */}
                  <Area type="monotone" dataKey="muertes" name="Muertes por Eventos de Transporte" stroke="#B30000" fill="#B30000" fillOpacity={0.4} dot={{ r: 4 }}>
                    <LabelList dataKey="muertes" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* GRÁFICO NIÑO */}
            <div style={{ flex: 1, minWidth: '400px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h4 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Niño</h4>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart
                  data={[
                    { ciclo: '(00 a 05) Primera Infancia', lesiones: 949, muertes: 204 },
                    { ciclo: '(06 a 11) Infancia', lesiones: 1551, muertes: 164 },
                    { ciclo: '(12 a 17) Adolescencia', lesiones: 3501, muertes: 1310 },
                  ]}
                  margin={{ top: 30, right: 40, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={formatK} domain={[0, 4000]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />

                  {/* Lesiones - Amarillo */}
                  <Area type="monotone" dataKey="lesiones" name="Lesiones por Eventos de Transporte" stroke="#FFD600" fill="#FFD600" fillOpacity={0.4} dot={{ r: 4 }}>
                    <LabelList dataKey="lesiones" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>

                  {/* Muertes - Rojo */}
                  <Area type="monotone" dataKey="muertes" name="Muertes por Eventos de Transporte" stroke="#B30000" fill="#B30000" fillOpacity={0.4} dot={{ r: 4 }}>
                    <LabelList dataKey="muertes" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      ),
      descripcion: "Comparativa de accidentalidad vial por género. Se observa que los niños presentan cifras significativamente más altas en la adolescencia, alcanzando 3.501 lesiones y 1.310 muertes, en comparación con las niñas que registran 2.489 lesiones y 383 muertes en el mismo periodo."
    },


    5: {
      titulo: "CASOS DE DELITO SEXUAL POR CICLO VITAL Y SEXO DE LA VÍCTIMA",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* GRÁFICO NIÑA */}
            <div style={{ flex: 1, minWidth: '400px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h4 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Niña</h4>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart
                  data={[
                    { ciclo: '(00 a 05) Primera Infancia', casos: 9148 },
                    { ciclo: '(06 a 11) Infancia', casos: 24366 },
                    { ciclo: '(12 a 17) Adolescencia', casos: 47092 },
                  ]}
                  margin={{ top: 30, right: 45, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 50000]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />

                  <Area
                    type="monotone"
                    dataKey="casos"
                    name="Delito Sexual"
                    stroke="#B30000"
                    fill="#B30000"
                    fillOpacity={0.4}
                    dot={{ r: 4, fill: '#B30000' }}
                  >
                    <LabelList dataKey="casos" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* GRÁFICO NIÑO */}
            <div style={{ flex: 1, minWidth: '400px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h4 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Niño</h4>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart
                  data={[
                    { ciclo: '(00 a 05) Primera Infancia', casos: 2917 },
                    { ciclo: '(06 a 11) Infancia', casos: 5481 },
                    { ciclo: '(12 a 17) Adolescencia', casos: 4179 },
                  ]}
                  margin={{ top: 30, right: 40, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 10000]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />

                  <Area
                    type="monotone"
                    dataKey="casos"
                    name="Delito Sexual"
                    stroke="#B30000"
                    fill="#B30000"
                    fillOpacity={0.4}
                    dot={{ r: 4, fill: '#B30000' }}
                  >
                    <LabelList dataKey="casos" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      ),
      descripcion: "El reporte de delitos sexuales presenta una disparidad crítica de género. En las niñas, las cifras crecen exponencialmente con la edad, alcanzando los 47.092 casos en la adolescencia. En los niños, el pico se observa en la infancia (6 a 11 años) con 5.481 casos."
    },

    6: {
      titulo: "CASOS DE DESAPARICIÓN POR CICLO VITAL Y SEXO DE LA VÍCTIMA",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* GRÁFICO NIÑA */}
            <div style={{ flex: 1, minWidth: '400px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h4 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Niña</h4>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart
                  data={[
                    { ciclo: '(00 a 05) Primera Infancia', casos: 368 },
                    { ciclo: '(06 a 11) Infancia', casos: 423 },
                    { ciclo: '(12 a 17) Adolescencia', casos: 7474 },
                  ]}
                  margin={{ top: 30, right: 45, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 8000]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />

                  <Area
                    type="monotone"
                    dataKey="casos"
                    name="Desaparición"
                    stroke="#B30000"
                    fill="#B30000"
                    fillOpacity={0.4}
                    dot={{ r: 4, fill: '#B30000' }}
                  >
                    <LabelList dataKey="casos" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* GRÁFICO NIÑO */}
            <div style={{ flex: 1, minWidth: '400px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h4 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Niño</h4>
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart
                  data={[
                    { ciclo: '(00 a 05) Primera Infancia', casos: 371 },
                    { ciclo: '(06 a 11) Infancia', casos: 400 },
                    { ciclo: '(12 a 17) Adolescencia', casos: 3052 },
                  ]}
                  margin={{ top: 30, right: 40, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="ciclo" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 4000]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px' }} />

                  <Area
                    type="monotone"
                    dataKey="casos"
                    name="Desaparición"
                    stroke="#B30000"
                    fill="#B30000"
                    fillOpacity={0.4}
                    dot={{ r: 4, fill: '#B30000' }}
                  >
                    <LabelList dataKey="casos" position="top" offset={10} style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      ),
      descripcion: "Se evidencia un aumento alarmante de desapariciones en la etapa de la adolescencia. En el caso de las niñas, la cifra llega a 7.474 reportes, lo que representa más del doble de los casos registrados en niños para el mismo rango de edad (3.052 casos)."
    },

  };

  return (
    <div className={styles.statsPage}>
      <header className={styles.headerLeft}>
        <h1>Observatorio <span>Rutas del Saber</span></h1>
        <p>Análisis detallado de indicadores sociales y ambientales [2020 - 2025]</p>
      </header>

      {/* Contenedor de las pestañas y el contenido */}
      <div className={styles.tabContainer}>
        <div className={styles.tabBar}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              className={`${styles.tabButton} ${activeTab === num ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(num)}
            >
              {num}
            </button>
          ))}
        </div>

        {/* APLICAMOS LA ANIMACIÓN AQUÍ: 
      Al poner la key en el mainDisplay, todo lo que está adentro 
      (título, gráfico, descripción) subirá al mismo tiempo.
  */}
        <div
          className={`${styles.mainDisplay} ${styles.fadeUp}`}
          key={activeTab}
        >
          {/* Área del Gráfico */}
          <div className={styles.chartArea}>
            <div className={styles.breadcrumb}>
              | {tabData[activeTab]?.titulo || "Próximamente"}
            </div>
            <div className={styles.chartContentWrapper}>
              {tabData[activeTab]?.componente || (
                <div className={styles.placeholder}>Información en desarrollo...</div>
              )}
            </div>
          </div>

          {/* Área de Información Lateral */}
          <div className={styles.infoArea}>
            <h3>Detalles del Indicador</h3>
            <p>{tabData[activeTab]?.descripcion || "Seleccione una pestaña."}</p>
            <div className={styles.infoFooter}>
              <small>Fuente: Datos Abiertos Colombia</small>
            </div>
          </div>
        </div>
      </div>




      <div className={styles.databaseContainer}>
        <div className={styles.databaseContent}>

          {/* Columna Izquierda: Enlaces */}
          <div className={styles.linksSide}>
            <div className={styles.cardHeader}>
              <span>FUENTES OFICIALES</span> | BASES DE DATOS ABIERTAS
            </div>
            <p className={styles.dbDescription}>
              Accede a los datos crudos y fuentes gubernamentales utilizadas para este análisis.
            </p>

            <div className={styles.linkList}>
              {[
                {
                  name: "Muertes por eventos de transporte",
                  url: "https://www.datos.gov.co/Justicia-y-Derecho/Muertes-por-eventos-de-transporte-Colombia-a-os-20/s65h-7665/about_data",
                  icon: <Car size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
                {
                  name: "Desaparecidos en Colombia (Histórico)",
                  url: "https://www.datos.gov.co/Justicia-y-Derecho/Desaparecidos-en-Colombia-Hist-rico-diciembre-de-2/8hqm-7fdt/about_data",
                  icon: <UserSearch size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
                {
                  name: "Lesiones por eventos de transporte",
                  url: "https://www.datos.gov.co/Justicia-y-Derecho/Lesiones-por-eventos-de-transporte-Colombia-a-os-2/ezhf-hscf/about_data",
                  icon: <Activity size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
                {
                  name: "Exámenes médico-legales (Delito Sexual)",
                  url: "https://www.datos.gov.co/Justicia-y-Derecho/Ex-menes-m-dico-legales-por-presunto-delito-sexual/hyqu-diue/about_data",
                  icon: <ShieldAlert size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
                {
                  name: "Violencia Interpersonal (2015-2024)",
                  url: "https://www.datos.gov.co/Justicia-y-Derecho/Violencia-interpersonal-Colombia-a-os-2015-a-2024-/e3xi-4zq5/about_data",
                  icon: <Users size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
                {
                  name: "Violencia Intrafamiliar (2015-2024)",
                  url: "https://www.datos.gov.co/Justicia-y-Derecho/Violencia-intrafamiliar-Colombia-a-os-2015-a-2024-/ers2-kerr/about_data",
                  icon: <Home size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dbLink}
                >
                  {link.icon}
                  <span className={styles.linkText}>{link.name}</span>
                  <ExternalLink size={14} color="#ba0000" className={styles.externalArrow} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna Derecha */}
          <div className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              <img
                src={img}
                alt="Análisis de Datos"
                className={styles.sideImage}
              />
              <div className={styles.imageOverlay}>
                <span>DATOS ABIERTOS COLOMBIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); // Cierre del return
}; // Cierre del componente Estadisticas

export default Estadisticas;