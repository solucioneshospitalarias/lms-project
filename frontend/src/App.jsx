import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";
import Home from "./components/Home/Home";
import Productos from "./components/Productos/Productos";
import Estadisticas from "./components/Estadisticas/Estadisticas";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LoginProfesor from './components/Auth/LoginProfesor';
import RegisterProfesor from './components/Auth/RegisterProfesor';
import Conocenos from "./components/Conocenos/Conocenos";
import Contacto from "./components/Contacto/Contacto";
import Terminos from "./components/Legal/Terminos";
import Privacidad from "./components/Legal/Privacidad";
import Autorizacion from "./components/Legal/Autorizacion";
import WhatsAppQR from "./components/WhatsApp/WhatsAppQR";
import ForgotPassword from "./components/Auth/ForgotPassword";
import AdminLayout from "./components/layout/AdminLayout";
import ClassroomHome from "./components/AulaVirtual/ClassroomHome";
import MisCursos from "./components/AulaVirtual/MisCursos";
import EstadisticasAula from "./components/AulaVirtual/EstadisticasAula";
import Comunidad from "./components/AulaVirtual/Comunidad";
import ConfiguracionAula from "./components/AulaVirtual/ConfiguracionAula";
import CalendarioAula from './components/AulaVirtual/CalendarioAula';

function App() {
  const { pathname } = useLocation();

  // Definimos qué páginas NO deben mostrar el Header y Footer de la Landing
  const isCleanPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/login-profesor" ||
    pathname === "/register-profesor" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/aula-virtual");

  useEffect(() => {
    if (!isCleanPage) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isCleanPage]);

  return (
    <HelmetProvider>
      <div className="app-container">
        <Helmet>
          <title>Rutas del Saber | Plataforma Educativa</title>
          <meta
            name="description"
            content="Rutas del Saber es una iniciativa dedicada al fortalecimiento educativo y el aprendizaje significativo."
          />
        </Helmet>

        {/* El Header solo aparece si NO es una página limpia (login o aula virtual) */}
        {!isCleanPage && <Header />}

        {/* Quitamos el textAlign center solo para el aula virtual para que no dañe el grid */}
        <main
          style={!isCleanPage ? { textAlign: "center" } : { width: "100%" }}
        >
          <Routes>
            {/* RUTAS LANDING */}
            <Route path="/" element={<Home />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/conocenos" element={<Conocenos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-profesor" element={<LoginProfesor />} />
            <Route path="/register-profesor" element={<RegisterProfesor />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/autorizacion" element={<Autorizacion />} />

            {/* RUTAS AULA VIRTUAL (Usando el AdminLayout) */}
            <Route path="/aula-virtual" element={<AdminLayout />}>
              <Route index element={<ClassroomHome />} />
              <Route path="mis-cursos" element={<MisCursos />} />
              <Route path="estadisticas" element={<EstadisticasAula />} />
              <Route path="comunidad" element={<Comunidad />} />
              <Route path="configuracion" element={<ConfiguracionAula />} />
              <Route path="calendario" element={<CalendarioAula />} /> 
            </Route>

          </Routes>

          {!isCleanPage && <ScrollToTop />}
        </main>

        {!isCleanPage && <Footer />}
        {!isCleanPage && <WhatsAppQR />}
      </div>
    </HelmetProvider>
  );
}

export default App;
