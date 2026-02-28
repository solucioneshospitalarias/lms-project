import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";
import Home from "./components/Home/Home";
import Productos from "./components/Productos/Productos";
// import Recursos from "./components/Recursos/Recursos";
import Estadisticas from "./components/Estadisticas/Estadisticas";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Conocenos from "./components/Conocenos/Conocenos";
import Contacto from "./components/Contacto/Contacto";
import Terminos from "./components/Legal/Terminos";
import Privacidad from "./components/Legal/Privacidad";
import Autorizacion from "./components/Legal/Autorizacion";
import WhatsAppQR from "./components/WhatsApp/WhatsAppQR";
import ForgotPassword from './components/Auth/ForgotPassword';

function App() {
  const location = useLocation();

  // Condición corregida: detecta tanto Login como Register
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
    <div className="app-container">
      {!isAuthPage && <Header />}

      <main style={!isAuthPage ? { textAlign: "center" } : {}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/productos" element={<Productos />} />
          {/* <Route path="/recursos" element={<Recursos />} /> */}
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
  );
}

export default App;