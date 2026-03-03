import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// 1. Importar Helmet
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";
import Home from "./components/Home/Home";
import Productos from "./components/Productos/Productos";
import Estadisticas from "./components/Estadisticas/Estadisticas";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Conocenos from "./components/Conocenos/Conocenos";
import Contacto from "./components/Contacto/Contacto";
import Terminos from "./components/Legal/Terminos";
import Privacidad from "./components/Legal/Privacidad";
import Autorizacion from "./components/Legal/Autorizacion";
import WhatsAppQR from "./components/WhatsApp/WhatsAppQR";
import ForgotPassword from "./components/Auth/ForgotPassword";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  useEffect(() => {
    if (!isAuthPage) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isAuthPage]);

  return (
    // 2. Envolver todo en HelmetProvider
    <HelmetProvider>
      <div className="app-container">
        {/* 3. Configuración de SEO Global/Home */}
        <Helmet>
          <title>Rutas del Saber | Plataforma Educativa</title>
          <meta
            name="description"
            content="Rutas del Saber es una iniciativa dedicada al fortalecimiento educativo y el aprendizaje significativo. Explora nuestros recursos, productos y estadísticas."
          />
          <meta
            name="keywords"
            content="educación, rutas del saber, aprendizaje, recursos educativos"
          />
          <link rel="canonical" href="https://www.rutasdelsaber.com" />
        </Helmet>

        {!isAuthPage && <Header />}

        <main style={!isAuthPage ? { textAlign: "center" } : {}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/conocenos" element={<Conocenos />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/autorizacion" element={<Autorizacion />} />
          </Routes>

          {!isAuthPage && <ScrollToTop />}
        </main>

        {!isAuthPage && <Footer />}

        <WhatsAppQR />
      </div>
    </HelmetProvider>
  );
}

export default App;
