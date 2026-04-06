import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Bell, Lock, LifeBuoy, ChevronRight } from "lucide-react";
import styles from "./ConfiguracionAula.module.css";

const ConfiguracionAula = () => {
  const navigate = useNavigate();

  const handleAction = (id) => {
    if (id === "seguridad") {
      navigate("/aula-virtual/restablecer-contraseña");
    }

    else if (id === "perfil") {
      navigate("/aula-virtual/mi-perfil");
    }
    else if (id === "soporte") {
      const mensaje = "Hola, necesito ayuda con la plataforma Rutas del Saber";
      const telefono = "57000000000";

      window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
      /* Opción B: Email (Si prefieres correo, comenta lo de arriba y usa esto)
      window.location.href = "mailto:soporte@rutasdelsaber.com?subject=Soporte Técnico&body=Hola equipo...";
      */
    }
  };

  const sections = [
    {
      id: "perfil",
      title: "Perfil Personal",
      desc: "Actualiza tu foto, nombre de usuario y datos de contacto público.",
      icon: <User size={20} />,
      action: "Editar Perfil",
      primary: true,
    },
    {
      id: "notificaciones",
      title: "Notificaciones",
      desc: "Gestiona cómo y cuándo recibes las alertas de tus cursos y actividades.",
      icon: <Bell size={20} />,
      action: "Configurar",
    },
    {
      id: "seguridad",
      title: "Seguridad",
      desc: "Protege tu cuenta cambiando tu contraseña y revisando sesiones activas.",
      icon: <Lock size={20} />,
      action: "Gestionar",
    },
    {
      id: "soporte",
      title: "Soporte Técnico",
      desc: "¿Tienes dudas o problemas con tus cursos? Nuestro equipo está listo para ayudarte.",
      icon: <LifeBuoy size={20} />,
      action: "Contactar Soporte",
    },
  ];

  return (
    <div className={`${styles.container} fadeUpEffect`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Configuración</h1>
        <p className={styles.subtitle}>
          Personaliza tu experiencia en <strong>Rutas del Saber</strong> y gestiona tu privacidad.
        </p>
      </header>

      <div className={styles.grid}>
        {sections.map((section) => (
          <div key={section.id} className={styles.card}>
            <div className={styles.cardInfo}>
              <div className={styles.iconWrapper}>{section.icon}</div>
              <div className={styles.textWrapper}>
                <h3>{section.title}</h3>
                <p>{section.desc}</p>
              </div>
            </div>

            <button
              className={section.primary ? styles.btnPrimary : styles.btnSecondary}
              onClick={() => handleAction(section.id)}
            >
              <span>{section.action}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfiguracionAula;