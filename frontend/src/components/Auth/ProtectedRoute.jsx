import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { userData } = useUser();
    const location = useLocation();

    // 1. Si no hay usuario logueado o es invitado -> Mandar al Login
    if (!userData || !userData.user_type || userData.nombre === "Usuario Invitado") {
        const isProfesorRoute = location.pathname.includes('panel-profesor');
        return <Navigate to={isProfesorRoute ? "/login-profesor" : "/login"} state={{ from: location }} replace />;
    }

    // 2. Si el rol no está permitido para esta ruta (ej: alumno en panel-profe o viceversa)
    if (allowedRoles && !allowedRoles.includes(userData.user_type)) {
        const fallback = userData.user_type === 'profesor' ? "/panel-profesor" : "/aula-virtual";
        return <Navigate to={fallback} replace />;
    }

    // 3. Todo OK
    return children;
};

export default ProtectedRoute;
