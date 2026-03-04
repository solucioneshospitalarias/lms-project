// src/components/layout/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../AulaVirtual/SidebarAdmin";
import NavbarAula from "../AulaVirtual/NavbarAula";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
