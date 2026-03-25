import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Crear instancia de axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor de request - Agregar token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de response - Manejar errores y refresh token
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 (no autorizado) y no hemos intentado refresh aún
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                
                if (refreshToken) {
                    // Intentar refrescar el token
                    const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
                        refresh: refreshToken
                    });

                    const newAccessToken = response.data.access;
                    localStorage.setItem('accessToken', newAccessToken);

                    // Reintentar la petición original con el nuevo token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Si el refresh falla, limpiar tokens y redirigir al login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // Opcional: Redirigir al login
                // window.location.href = '/login';
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// ==================== FUNCIONES DE AUTENTICACIÓN ====================

/**
 * Validar si un documento existe en el padrón
 * @param {Object} data - Datos de validación
 * @param {string} data.tipo_usuario - 'alumno' o 'profesor'
 * @param {string} data.num_documento - Número de documento
 * @param {string} data.tipo_doc - Tipo de documento (TI, CC, CE)
 * @param {string} [data.nombre_completo] - Nombre completo (opcional)
 * @returns {Promise} Respuesta de validación
 */
export const validarPadron = async (data) => {
        const response = await api.post('/auth/validar-padron/', data);
        return response.data;
};

/**
 * Registrar un nuevo alumno
 * @param {Object} data - Datos del alumno
 * @returns {Promise} Usuario creado con tokens
 */
export const registrarAlumno = async (data) => {
        const response = await api.post('/auth/registro/alumno/', data);
        
        // Guardar tokens automáticamente
        if (response.data.tokens) {
            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);
        }
        
        return response.data;
};

/**
 * Registrar un nuevo profesor
 * @param {Object} data - Datos del profesor
 * @returns {Promise} Usuario creado con tokens
 */
export const registrarProfesor = async (data) => {
        const response = await api.post('/auth/registro/profesor/', data);
        
        // Guardar tokens automáticamente
        if (response.data.tokens) {
            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);
        }
        
        return response.data;
};

/**
 * Iniciar sesión
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Promise} Usuario con tokens
 */
export const login = async (email, password) => {
    const response = await api.post('/auth/login/', { email, password });
    if (response.data.tokens) {
        localStorage.setItem('accessToken', response.data.tokens.access);
        localStorage.setItem('refreshToken', response.data.tokens.refresh);
    }
    return response.data;
};

/**
 * Cerrar sesión
 * @returns {Promise} Mensaje de confirmación
 */
export const logout = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
            await api.post('/auth/logout/', { refresh_token: refreshToken });
        }
        
        // Limpiar tokens del localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        return { message: 'Sesión cerrada exitosamente' };
    } catch (error) {
        // Limpiar tokens incluso si hay error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error.response?.data || error.message;
    }
};

/**
 * Refrescar el token de acceso
 * @returns {Promise} Nuevo access token
 */
export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
            throw new Error('No hay refresh token disponible');
        }
        
        const response = await api.post('/auth/token/refresh/', { refresh: refreshToken });
        
        // Actualizar access token
        if (response.data.access) {
            localStorage.setItem('accessToken', response.data.access);
        }
        
        return response.data;
    } catch (error) {
        // Si falla el refresh, limpiar tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error.response?.data || error.message;
    }
};

/**
 * Obtener información del usuario actual
 * @returns {Promise} Datos del usuario autenticado
 */
export const obtenerUsuarioActual = async () => {
    const response = await api.get('/auth/me/');
    return response.data;
};

// ==================== FUNCIONES DE COLEGIOS ====================

/**
 * Listar todos los colegios
 * @returns {Promise} Lista de colegios
 */
export const listarColegios = async () => {
    const response = await api.get('/colegios/');
    return response.data;
};

/**
 * Obtener detalle de un colegio
 * @param {number} id - ID del colegio
 * @returns {Promise} Datos del colegio
 */
export const obtenerColegio = async (id) => {
    const response = await api.get(`/colegios/${id}/`);
    return response.data;
};

/**
 * Buscar colegios por término
 * @param {string} termino - Término de búsqueda
 * @returns {Promise} Lista de colegios encontrados
 */
export const buscarColegios = async (termino) => {
    const response = await api.get('/colegios/buscar/', {
        params: { q: termino }
    });
    return response.data;
};

// ==================== FUNCIONES DE USUARIOS ====================

/**
 * Listar usuarios (solo admin)
 * @returns {Promise} Lista de usuarios
 */
export const listarUsuarios = async () => {
    const response = await api.get('/users/');
    return response.data;
};

/**
 * Obtener detalle de un usuario
 * @param {number} id - ID del usuario
 * @returns {Promise} Datos del usuario
 */
export const obtenerUsuario = async (id) => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
};

/**
 * Obtener perfil del usuario actual
 * @returns {Promise} Datos del perfil
 */
export const obtenerPerfil = async () => {
    const response = await api.get('/users/perfil/');
    return response.data;
};

// ==================== UTILIDADES ====================

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean} True si hay token
 */
export const estaAutenticado = () => {
    return !!localStorage.getItem('accessToken');
};

/**
 * Obtener el token de acceso actual
 * @returns {string|null} Token de acceso
 */
export const obtenerToken = () => {
    return localStorage.getItem('accessToken');
};

/**
 * Limpiar tokens del localStorage
 */
export const limpiarTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

/**
 * Solicitar enlace de restablecimiento de contraseña
 * @param {string} email 
 */
export const solicitarRestablecimiento = async (email) => {
    const response = await api.post('/auth/request-reset/', { email });
    return response.data;
};

/**
 * Confirmar nueva contraseña
 * @param {string} uidb64 
 * @param {string} token 
 * @param {string} password 
 */
export const confirmarRestablecimiento = async (uidb64, token, password) => {
    const response = await api.post('/auth/password-reset-confirm/', {
        uidb64,
        token,
        password
    });
    return response.data;
};

export default api;