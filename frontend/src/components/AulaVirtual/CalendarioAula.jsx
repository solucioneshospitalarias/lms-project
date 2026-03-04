import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  getMonth,
  getYear,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaCalendarWeek,
} from "react-icons/fa";
import styles from "./CalendarioAula.module.css";

const DIAS_HEADER = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

const CalendarioAula = () => {
  const [fechaReferencia, setFechaReferencia] = useState(new Date());
  const [tipoVista, setTipoVista] = useState("semana");

  const hoy = new Date();

  // Vista Semana
  const inicioSemana = startOfWeek(fechaReferencia, { weekStartsOn: 1 });
  const diasSemana = Array.from({ length: 7 }, (_, i) =>
    addDays(inicioSemana, i),
  );

  // Vista Mes
  const inicioMes = startOfMonth(fechaReferencia);
  const finMes = endOfMonth(inicioMes);
  const diasMes = eachDayOfInterval({
    start: startOfWeek(inicioMes, { weekStartsOn: 1 }),
    end: endOfWeek(finMes, { weekStartsOn: 1 }),
  });

  const navegar = (direccion) => {
    if (tipoVista === "semana") {
      setFechaReferencia(
        direccion === "next"
          ? addWeeks(fechaReferencia, 1)
          : subWeeks(fechaReferencia, 1),
      );
    } else {
      setFechaReferencia(
        direccion === "next"
          ? addMonths(fechaReferencia, 1)
          : subMonths(fechaReferencia, 1),
      );
    }
  };

  const esMesActual = (dia) =>
    getMonth(dia) === getMonth(fechaReferencia) &&
    getYear(dia) === getYear(fechaReferencia);

  return (
    <div className={`${styles.calendarioContainer} ${styles[tipoVista]} fadeUpEffect`}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.leftControls}>
          <span className={styles.mesDisplay}>
            {format(fechaReferencia, "MMMM yyyy", { locale: es })}
          </span>
          <button
            className={styles.todayBtn}
            onClick={() => setFechaReferencia(new Date())}
          >
            Hoy
          </button>
        </div>

        <div className={styles.navegacion}>
          <button className={styles.navBtn} onClick={() => navegar("prev")}>
            <FaChevronLeft />
          </button>
          <button className={styles.navBtn} onClick={() => navegar("next")}>
            <FaChevronRight />
          </button>
        </div>

        <div className={styles.viewSelector}>
          <button
            className={`${styles.viewBtn} ${tipoVista === "semana" ? styles.activeView : ""}`}
            onClick={() => setTipoVista("semana")}
          >
            <FaCalendarWeek /> Semana
          </button>
          <button
            className={`${styles.viewBtn} ${tipoVista === "mes" ? styles.activeView : ""}`}
            onClick={() => setTipoVista("mes")}
          >
            <FaCalendarAlt /> Mes
          </button>
        </div>
      </div>

      {/* CABECERA DE DÍAS — siempre fija arriba */}
      <div className={styles.headerDias}>
        {DIAS_HEADER.map((d) => (
          <div key={d} className={styles.nombreDiaHeader}>
            {d}
          </div>
        ))}
      </div>

      {/* CUERPO: cambia según la vista */}
      {tipoVista === "semana" ? (
        /* ── VISTA SEMANA ── */
        <div className={styles.gridSemana}>
          {diasSemana.map((dia, i) => (
            <div key={i} className={styles.columnaDia}>
              <div
                className={`${styles.numeroDia} ${isSameDay(dia, hoy) ? styles.hoy : ""}`}
              >
                {format(dia, "d")}
              </div>
              <div className={styles.espacioEventos} />
            </div>
          ))}
        </div>
      ) : (
        /* ── VISTA MES ── */
        <div className={styles.gridMes}>
          {diasMes.map((dia, i) => (
            <div
              key={i}
              className={`${styles.celdaDia} ${!esMesActual(dia) ? styles.diaFuera : ""}`}
            >
              <div
                className={`${styles.numeroDia} ${isSameDay(dia, hoy) ? styles.hoy : ""}`}
              >
                {format(dia, "d")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarioAula;
