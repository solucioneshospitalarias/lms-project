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
import MiPerfil from './components/AulaVirtual/MiPerfil';
import MisCursos from "./components/AulaVirtual/MisCursos";
import RestablecerContraseña from "./components/AulaVirtual/RestablecerContraseña";
import Desempeños from "./components/AulaVirtual/Desempeños";
import ConfiguracionAula from "./components/AulaVirtual/ConfiguracionAula";
import CalendarioAula from './components/AulaVirtual/CalendarioAula';
import VisorNotas from './components/AulaVirtual/VisorNotas/VisorNotas'
import PanelProfesor from './components/AulaVirtual/PanelProfesor/PanelProfesor'

function App() {
  const { pathname } = useLocation();

  const cleanRoutes = ["/login", "/register", "/login-profesor", "/register-profesor", "/forgot-password", "/panel-profesor", "/visor-notas"];
  const isCleanPage = cleanRoutes.includes(pathname) || pathname.startsWith("/aula-virtual");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

        {!isCleanPage && <Header />}

        <main
          style={!isCleanPage ? { textAlign: "center" } : { width: "100%" }}
        >
          <Routes>
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

            <Route path="/panel-profesor" element={<PanelProfesor />} />

            <Route path="/aula-virtual" element={<AdminLayout />}>
              <Route index element={<ClassroomHome />} />
              <Route path="mi-perfil" element={<MiPerfil />} />
              <Route path="mis-cursos" element={<MisCursos />} />
              <Route path="restablecer-contraseña" element={<RestablecerContraseña />} />
              <Route path="desempeños" element={<Desempeños />} />
              <Route path="configuracion" element={<ConfiguracionAula />} />
              <Route path="calendario" element={<CalendarioAula />} />
            </Route>

            <Route path="/visor-notas" element={<VisorNotas />} />

          </Routes>

          <ScrollToTop />
        </main>

        {!isCleanPage && <Footer />}
        {!isCleanPage && <WhatsAppQR />}
      </div>
    </HelmetProvider>
  );
}

export default App;
