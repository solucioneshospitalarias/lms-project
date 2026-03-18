import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarAdmin from "../AulaVirtual/SidebarAdmin";
import NavbarAula from "../AulaVirtual/NavbarAula";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <title>Rutas del Saber | Classroom</title>
      <NavbarAula toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex" }}>
        <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          style={{
            flexGrow: 1,
            padding: "20px",
            marginLeft: isSidebarOpen ? "260px" : "72px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <div key={location.pathname} className="fadeUpEffect">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
