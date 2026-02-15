import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Importante para la navegación
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";
import Home from "./components/Home/Home";
import Productos from "./components/Productos/Productos";
import Recursos from "./components/Recursos/Recursos";
import Estadisticas from "./components/Estadisticas/Estadisticas";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    // Esto fuerza a la página a subir al tope cada vez que cambias de pestaña
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // El toque profesional "suave"
    });
  }, [pathname]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Esta lógica se ejecuta solo una vez cuando la aplicación se monta (al cargar o recargar)
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: "50px", textAlign: "center" }}>
        {/* Aquí es donde ocurre la magia: decide qué componente cargar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/recursos" element={<Recursos />} />
        </Routes>

        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
}

export default App;
