import React, { useEffect } from "react";
import Header from "./components/layout/Header/Header";
import Hero from "./components/layout/Hero/Hero";
import Slider from "./components/Gallery/Slider";
import About from "./components/About/About";
import data from "./components/Gallery/data";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";
import InfoCarousel from "./components/InfoCarousel/InfoCarousel";
import Footer from "./components/layout/Footer/Footer";
import videoInicio from "./assets/videoInicio.mp4";
function App() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: "50px", textAlign: "center" }}>
        <InfoCarousel />
        <Hero
          badge="Formacion Completa"
          title="Educación 360"
          p1="En Rutas del Saber, creemos que la educación es la herramienta más poderosa."
          p2="Somos una organización comprometida con el interés público."
          highlight="Formar a las nuevas generaciones es una misión de todos."
          quote="Nuestra plataforma es el punto de encuentro donde comunidades y líderes se unen."
          videoSrc={videoInicio}
        />

        <Hero
          badge="Convivencia Armónica"
          title="Cultura de Paz"
          p1="Texto descriptivo para el segundo bloque sobre tecnología educativa."
          p2="Implementamos soluciones que transforman el aula tradicional."
          highlight="La tecnología al servicio del conocimiento humano."
          quote="Innovar no es una opción, es una necesidad para el progreso social."
          videoSrc={videoInicio}
        />

        <Hero
          badge="Transformación Colectiva"
          title="Educación Ambiental"
          p1="Texto para el tercer bloque enfocado en el trabajo de campo."
          p2="Llegamos a donde otros no llegan para fortalecer la educación."
          highlight="Unidos construimos un futuro con bases sólidas."
          quote="El territorio es el primer maestro de nuestras comunidades."
          videoSrc={videoInicio}
        />

        <Hero
          badge="Respeto Mutuo"
          title="Convivencia Escolar"
          p1="Descripción final para el cuarto bloque informativo."
          p2="Damos soporte continuo a las instituciones y sus líderes."
          highlight="Acompañamiento integral en cada paso del proceso."
          quote="Ninguna meta es inalcanzable cuando se tiene el respaldo correcto."
          videoSrc={videoInicio}
        />

        <Hero
          badge="Movilidad Segura"
          title="Educación Vial"
          p1="Descripción final para el cuarto bloque informativo."
          p2="Damos soporte continuo a las instituciones y sus líderes."
          highlight="Acompañamiento integral en cada paso del proceso."
          quote="Ninguna meta es inalcanzable cuando se tiene el respaldo correcto."
          videoSrc={videoInicio}
        />

        <About />
        <Slider data={data} activeSlide={0} />
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
}

export default App;
