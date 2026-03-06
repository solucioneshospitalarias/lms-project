import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList,
  AreaChart, Area
} from 'recharts';
import { Car, UserSearch, Activity, ShieldAlert, Users, Home, ExternalLink, School, FileText } from 'lucide-react'
import styles from './Estadisticas.module.css';
import img from '../../assets/BaseDatos.png'

// FORMATEADOR UNIFICADO: Evita errores de "is not defined"
const formatK = (tickItem) => tickItem === 0 ? '0' : `${tickItem / 1000} mil`;

const isDark = document.body.classList.contains('dark-mode');

const chartColors = {
  text: isDark ? '#f8fafc' : '#1e293b',
  grid: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
  tooltipBg: isDark ? '#1e293b' : '#ffffff',
  tooltipBorder: isDark ? '#334155' : '#e2e8f0'
};


const Estadisticas = () => {
  const [activeTab, setActiveTab] = useState(1);

  // --- DATOS ---

  // PESTAÑA 1: 
  const dataInformePoblacion = [
    { ciclo: 'Primera Infancia (03 a 04)', totalmatriculados: 3510, totalpoblacion: 21464 },
    { ciclo: 'Transición (5 años)', totalmatriculados: 9344, totalpoblacion: 11131 },
    { ciclo: 'Básica Primaria (6-10 años)', totalmatriculados: 56870, totalpoblacion: 58051 },
    { ciclo: 'Básica Secundaria (11-14 años)', totalmatriculados: 42350, totalpoblacion: 45778 },
    { ciclo: 'Media Vocacional(15-16 años)', totalmatriculados: 17853, totalpoblacion: 22264 },
  ];

  // PESTAÑA 2: image_e4315f.png
  const dataInformeImagen = [
    { ciclo: '(12 a 17) Adolescencia', sexual: 47092, desaparicion: 7474, interpersonal: 12185, lesiones: 2489, intrafamiliar: 5000 },
    { ciclo: '(06 a 11) Infancia', sexual: 24366, desaparicion: 423, interpersonal: 2339, muertes: 102, intrafamiliar: 4415 },
    { ciclo: '(00 a 05) Primera Infancia', sexual: 9148, desaparicion: 368, interpersonal: 1141, muertes: 153, intrafamiliar: 2578 }
  ];

  // PESTAÑA 3: image_e44ffe.png
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

  // PESTAÑA 4: image_e4b1d4.png (Agresores Interpersonal)
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
      titulo: "TOTAL DE MATRICULADOS POR TOTAL POBLACIÓN",
      componente: (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={dataInformePoblacion} layout="vertical" margin={{ top: 20, right: 60, left: 40, bottom: 20 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} type="number" tickFormatter={formatK} domain={[0, 55000]} />
            <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" type="category" width={140} />
            <Tooltip contentStyle={{ backgroundColor: chartColors.tooltipBg, borderColor: chartColors.tooltipBorder, color: chartColors.text }} />
            <Legend verticalAlign="top" align="right" iconType="circle" />
            <Bar dataKey="totalmatriculados" name="Total matriculados" fill="#B30000" barSize={12}>
              <LabelList dataKey="totalmatriculados" position="right" style={{ fontSize: '10px' }} />
            </Bar>
            <Bar dataKey="totalpoblacion" name="Total Población" fill="#5c6670" barSize={12}>
              <LabelList dataKey="totalpoblacion" position="right" style={{ fontSize: '10px' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ),
      descripcion: "La situación de la primera infancia en el sistema educativo es un abismo crítico donde la educación inicial dista mucho de ser universal. Con una población de 21,464 niños de entre 3 y 4 años, solo 3,510 logran matricularse, lo que deja a un alarmante 83.6% en la invisibilidad escolar. Esta exclusión masiva provoca que la mayoría de los infantes ingresen al sistema formal recién a los 5 años, enfrentándose a una desventaja pedagógica profunda al carecer de los procesos de aprestamiento previos que son esenciales para su desarrollo."
    },
    2: {
      titulo: "CASOS POR TIPO DE ACCIDENTE / CONTEXTO DEL HECHO",
      componente: (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={dataInformeImagen} layout="vertical" margin={{ top: 20, right: 60, left: 40, bottom: 20 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} type="number" tickFormatter={formatK} domain={[0, 55000]} />
            <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" type="category" width={140} />
            <Tooltip contentStyle={{ backgroundColor: chartColors.tooltipBg, borderColor: chartColors.tooltipBorder, color: chartColors.text }} />
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
      descripcion: "La violencia y la accidentalidad aumentan drásticamente en la adolescencia, etapa donde se concentran los mayores indicadores de riesgo en comparación con la infancia y primera infancia."
    },
    3: {
      titulo: "TOP 10 TOTAL DE DELITOS AMBIENTALES",
      componente: (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={dataAmbiental} layout="vertical" margin={{ top: 20, right: 60, left: 40, bottom: 20 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} type="number" tickFormatter={formatK} domain={[0, 10000]} />
            <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="name" type="category" width={150} />
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
      descripcion: `El informe identifica como principal infracción el aprovechamiento ilícito de recursos naturales, que lidera la lista con 9.327 casos. Le siguen en relevancia la explotación 
      ilícita de yacimientos mineros (4.877 casos) y los daños en los recursos naturales (2.130 casos). Delitos como la contaminación ambiental (1.073 casos),
      la pesca ilegal (116) y el tráfico de fauna (113) presentan una frecuencia considerablemente menor.`
    },
    4: {
      titulo: "AGRESOR MÁS COMUNES: COMPARATIVA NIÑAS VS NIÑOS",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* TARJETA NIÑAS - Quitamos background: '#fff' y usamos chartColors.cardBg */}
            <div style={{
              flex: 1,
              minWidth: '300px',
              background: chartColors.cardBg,
              padding: '15px',
              borderRadius: '8px',
              boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
            }}>
              <h4 style={{ textAlign: 'center', marginBottom: '10px', color: isDark ? '#ff4d4d' : '#B30000' }}>
                CASOS NIÑAS
              </h4>
              {renderAreaChart(dataNinas)}
            </div>

            {/* TARJETA NIÑOS */}
            <div style={{
              flex: 1,
              minWidth: '300px',
              background: chartColors.cardBg,
              padding: '15px',
              borderRadius: '8px',
              boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
              border: isDark ? '1px solid #334155' : '1px solid transparent'
            }}>
              <h4 style={{ textAlign: 'center', marginBottom: '10px', color: isDark ? '#60a5fa' : '#004080' }}>
                CASOS NIÑOS
              </h4>
              {renderAreaChart(dataNinos)}
            </div>
          </div>
        </div>
      ),
      descripcion: `El análisis se centra en la violencia interpersonal donde el agresor es un amigo, compañero de estudio o profesor.
      En niñas: Los amigos son el agresor más común, con un pico de 5.220 casos en la adolescencia. Los compañeros de estudio le siguen con 3.336 casos en el mismo rango.
      En niños: Los compañeros de estudio son los agresores predominantes en la adolescencia (2.234 casos), superando a los amigos (1.091 casos).
      Hallazgo clave: Las niñas reportan un volumen total de casos considerablemente más alto que los niños, especialmente cuando el agresor es un "amigo". En ambos sexos, el rango de 12 a 17 años es el período crítico.`
    },

    5: {
      titulo: "CASOS DE LESIONES Y MUERTES POR CICLO VITAL Y SEXO DE LA VÍCTIMA",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* GRÁFICO NIÑA */}
            <div style={{ flex: 1, minWidth: '400px', background: 'transparent', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
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
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" />
                  <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} tickFormatter={formatK} domain={[0, 4000]} />
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
            <div style={{ flex: 1, minWidth: '400px', background: 'transparent', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
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
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" />
                  <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} tickFormatter={formatK} domain={[0, 4000]} />
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
      descripcion: `El riesgo de siniestralidad vial aumenta drásticamente con la edad, siendo la adolescencia el punto crítico.      
      Lesiones: Se registran 2.489 casos en adolescentes mujeres y 3.501 en adolescentes varones.
      Mortalidad: La brecha de género es profunda. Los adolescentes varones registran 1.310 muertes, una cifra que triplica los 383 casos de las adolescentes femeninas.
      Conclusión: Los hombres jóvenes son el grupo de mayor vulnerabilidad ante siniestros viales fatales, lo que sugiere la necesidad de estrategias de prevención diferenciadas.`
    },


    6: {
      titulo: "CASOS DE DELITO SEXUAL POR CICLO VITAL Y SEXO DE LA VÍCTIMA",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* GRÁFICO NIÑA */}
            <div style={{ flex: 1, minWidth: '400px', background: 'transparent', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
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
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" />
                  <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 50000]} />
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
            <div style={{ flex: 1, minWidth: '400px', background: 'transparent', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
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
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" />
                  <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 10000]} />
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
      descripcion: `El abuso sexual muestra una tendencia creciente y alarmante con la edad, con una marcada disparidad de género.      
      Población más vulnerable: Las niñas en la adolescencia (12 a 17 años) concentran la cifra más alta con 47.092 casos.
      Comparativa por género: En las niñas, los casos aumentan drásticamente de la primera infancia (9.148) a la adolescencia (47.092). En los niños, las cifras son significativamente menores, alcanzando su punto máximo en la infancia (6 a 11 años) con 5.481 casos.`
    },

    7: {
      titulo: "CASOS DE DESAPARICIÓN POR CICLO VITAL Y SEXO DE LA VÍCTIMA",
      componente: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* GRÁFICO NIÑA */}
            <div style={{ flex: 1, minWidth: '400px', background: 'transparent', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
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
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" />
                  <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 8000]} />
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
            <div style={{ flex: 1, minWidth: '400px', background: 'transparent', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
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
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} dataKey="ciclo" />
                  <YAxis stroke={chartColors.text} tick={{ fill: chartColors.text }} tickFormatter={(value) => value === 0 ? '0' : `${value / 1000} mil`} domain={[0, 4000]} />
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
      descripcion: `Se registra un total de 12.088 casos de desaparición.
      Prevalencia de género: Existe una prevalencia femenina significativa: las niñas representan el 68,37% de los casos.
      Impacto en la adolescencia: Esta es la etapa de mayor riesgo, con 7.474 casos en niñas adolescentes y 3.052 en niños.
      Estado de los casos: La mayoría de los menores han aparecido vivos (6.807), aunque persiste una cifra de 5.173 desaparecidos y 108 fallecidos.
      Distribución geográfica: Bogotá D.C. concentra la mayor cantidad de reportes (5.040), seguida por Valle del Cauca (1.201) y Cundinamarca (1.148).`
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
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <button
              key={num}
              className={`${styles.tabButton} ${activeTab === num ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(num)}
            >
              {num}
            </button>
          ))}
        </div>

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
                  name: "Listado de instituciones educativas Oficiales y no Oficiales",
                  url: "https://www.datos.gov.co/Educaci-n/Listado-de-Instituciones-Educativas-Oficiales-y-No/7tec-5fhs/about_data",
                  icon: <School size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
                {
                  name: "Boletin estadistico",
                  url: "https://www.atlantico.gov.co/images/stories/adjuntos/educacion/Planeacion/Boletin_Estadistico2024Educacion.pdf",
                  icon: <FileText size={20} strokeWidth={2} color="#ba0000" className={styles.linkIcon} />
                },
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
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          
          {/* Cabecera con metadatos */}
          <div className={styles.cardHeader}>
            <div className={styles.headerInfo}>
              <h2>Datos de Impacto</h2>
            </div>
            
            <div className={styles.liveStatus}>
              <div className={styles.pulseDot}></div>
                Sincronizado
            </div>
          </div>

          {/* El reporte de Power BI */}
          <div className={styles.powerBiWrapper}>
            <iframe 
              src="https://app.powerbi.com/view?r=eyJrIjoiMDgwZDJkZTEtY2ZlZi00ZDk2LWEyOGQtOGMwYzliYzg0OTI2IiwidCI6ImNiZTM5ZThmLTNlODktNDQ4Zi04M2FlLWVlYWI3MWU1ZjNiMSIsImMiOjR9"
              allowFullScreen={true}
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  ); // Cierre del return
}; // Cierre del componente Estadisticas

export default Estadisticas;