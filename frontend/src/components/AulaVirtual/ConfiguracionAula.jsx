import React from "react";

const ConfiguracionAula = () => {
  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h1 style={{ color: "#d32f2f", fontFamily: "Arial" }}>Configuración</h1>
      <hr style={{ border: "0.5px solid #e0e0e0", margin: "20px 0" }} />

      <section style={{ marginBottom: "30px" }}>
        <h3>Perfil</h3>
        <p style={{ color: "#5f6368" }}>
          Cambia tu foto de perfil y nombre de usuario.
        </p>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#fce8e6",
            color: "#d32f2f",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Editar Perfil
        </button>
      </section>

      <section>
        <h3>Notificaciones</h3>
        <p style={{ color: "#5f6368" }}>
          Gestiona cómo recibes las alertas de tus cursos.
        </p>
      </section>
    </div>
  );
};

export default ConfiguracionAula;
