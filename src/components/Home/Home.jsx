import React from "react";
import Hero from "../layout/Hero/Hero";
import styles from "./Home.module.css"
import InfoCarousel from "../InfoCarousel/InfoCarousel";
import About from "../About/About";
import Slider from "../Gallery/Slider";
import data from "../Gallery/data";
import videoInicio from "../../assets/videoInicio.mp4";

const Home = () => {
  return (
    <div className={styles.homeFadeIn}>
      <>
        <InfoCarousel />
        <Hero
          badge="Formacion Completa"
          title="Educación 360"
          p1="Nuestra visión integral articula cada una de estas normativas en un solo modelo de aprendizaje continuo."
          p2="En Rutas del Saber, creemos que la educación es la herramienta más poderosa cuando logra conectar los valores humanos, la responsabilidad civil y el cuidado del medio ambiente en una formación completa para la vida."
          quote="Una formación completa para que el aprendizaje no tenga límites."
          videoSrc={videoInicio}
        />
        <Hero
          badge="Convivencia Armónica"
          title="Cultura de Paz"
          p1="Implementamos la Cátedra de la Paz como una herramienta esencial para el cumplimiento de los estándares de convivencia ciudadana."
          p2="Formamos a las nuevas generaciones en valores de reconciliación y diálogo para construir una sociedad más justa y armónica."
          quote="Transformamos el aula en el escenario donde nace la paz de un país"
          videoSrc={videoInicio}
        />
        <Hero
          badge="Transformación Colectiva"
          title="Educación Ambiental"
          p1="Fortalecemos la cultura ambiental mediante la incorporación de proyectos sostenibles en el desarrollo territorial."
          p2="Nuestro objetivo es generar una conciencia ecológica que trascienda el aula, impulsando acciones concretas para la preservación de nuestro entorno natural."
          quote="Formamos hoy la conciencia que protegerá nuestro planeta mañana"
          videoSrc={videoInicio}
        />
        <Hero
          badge="Respeto Mutuo"
          title="Convivencia Escolar"
          p1="Lideramos la formación para el ejercicio de los Derechos Humanos y la prevención de la violencia en las aulas."
          p2="Creamos entornos seguros y diversos donde el respeto y la mitigación del acoso escolar son la base fundamental del crecimiento académico."
          quote="El respeto y la empatía son la base de una educación sin fronteras"
          videoSrc={videoInicio}
        />
        <Hero
          badge="Movilidad Segura"
          title="Educación Vial"
          p1="Promovemos la formación de hábitos y conductas seguras en la vía para proteger la vida. A través de programas pedagógicos en todos los niveles,"
          p2="buscamos que niños y jóvenes desarrollen comportamientos responsables como actores de la movilidad."
          quote="Cuidar nuestra vida en la vía es el primer paso para llegar lejos"
          videoSrc={videoInicio}
        />
        <About />
        <Slider data={data} activeSlide={0} />
      </>
    </div>
  );
};

export default Home;
