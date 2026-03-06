import React from "react";
import Hero from "../layout/Hero/Hero";
import styles from "./Home.module.css";
import InfoCarousel from "../InfoCarousel/InfoCarousel";
import Slider from "../Gallery/Slider";
import data from "../Gallery/data";
import Servicios from "../Servicios/Servicios";
import AulaVirtual from "../AulaVirtual/AulaVirtual";
import IdentityLinks from "../IdentityLinks/IdentityLinks";
import PersonalizedService from "../PersonalizedService/PersonalizedService";
import Innovacion from "../Innovacion/Innovacion";

const Home = () => {
  return (
    <div className={styles.homeFadeIn}>
      <InfoCarousel />

      {/* 1. EDUCACIÓN 360 */}
      <div id="educacion-360">
        <Hero
          videoSrc=" https://www.youtube.com/watch?v=Zr1UzrxVuyc"
          bgColor="#4A6D8C"
          badge="Formacion Completa"
          title="Educación 360"
          linkTo="educacion-360"
          p1="Nuestra visión integral articula cada una de estas normativas en un solo modelo de aprendizaje continuo."
          p2="En Rutas del Saber, creemos que la educación es la herramienta más poderosa cuando logra conectar los valores humanos, la responsabilidad civil y el cuidado del medio ambiente en una formación completa para la vida."
          quote="Una formación completa para que el aprendizaje no tenga límites."
        />
      </div>

      {/* 2. CULTURA DE PAZ */}
      <div id="cultura-paz">
        <Hero
          videoSrc="https://www.youtube.com/watch?v=gU_ayjh5Y6g"
          bgColor="#7A8C99"
          badge="Convivencia Armónica"
          title="Cultura de Paz"
          linkTo="cultura-paz"
          p1="Implementamos la Cátedra de la Paz como una herramienta esencial para el cumplimiento de los estándares de convivencia ciudadana."
          p2="Formamos a las nuevas generaciones en valores de reconciliación y diálogo para construir una sociedad más justa y armónica."
          quote="Transformamos el aula en el escenario donde nace la paz de un país"
        />
      </div>

      {/* 3. EDUCACIÓN AMBIENTAL */}
      <div id="educacion-ambiental">
        <Hero
          videoSrc="https://www.youtube.com/watch?v=Gpc1s9qSeVM&t=69s"
          bgColor="#5E7D5E"
          badge="Transformación Colectiva"
          title="Educación Ambiental"
          linkTo="educacion-ambiental"
          p1="Fortalecemos la cultura ambiental mediante la incorporación de proyectos sostenibles en el desarrollo territorial."
          p2="Nuestro objetivo es generar una conciencia ecológica que trascienda el aula, impulsando acciones concretas para la preservación de nuestro entorno natural."
          quote="Formamos hoy la conciencia que protegerá nuestro planeta mañana"
        />
      </div>

      {/* 4. CONVIVENCIA ESCOLAR */}
      <div id="convivencia-escolar">
        <Hero
          videoSrc="https://www.youtube.com/watch?v=ZjZHxOEv1p8"
          bgColor="#A67B5B"
          badge="Respeto Mutuo"
          title="Convivencia Escolar"
          linkTo="convivencia-escolar"
          p1="Lideramos la formación para el ejercicio de los Derechos Humanos y la prevención de la violencia en las aulas."
          p2="Creamos entornos seguros y diversos donde el respeto y la mitigación del acoso escolar son la base fundamental del crecimiento académico."
          quote="El respeto y la empatía son la base de una educación sin fronteras"
        />
      </div>

      {/* 5. EDUCACIÓN VIAL */}
      <div id="educacion-vial">
        <Hero
          videoSrc="https://www.youtube.com/watch?v=XyHdFT1OQr4"
          bgColor="#8C7A30"
          badge="Movilidad Segura"
          title="Educación Vial"
          linkTo="educacion-vial"
          p1="Promovemos la formación de hábitos y conductas seguras en la vía para proteger la vida. A través de programas pedagógicos en todos los niveles,"
          p2="buscamos que niños y jóvenes desarrollen comportamientos responsables como actores de la movilidad."
          quote="Cuidar nuestra vida en la vía es el primer paso para llegar lejos"
        />
      </div>

      <IdentityLinks />
      <Servicios />
      <AulaVirtual />
      <Slider data={data} activeSlide={0} />
      <PersonalizedService />
      <Innovacion />
    </div>
  );
};

export default Home;
