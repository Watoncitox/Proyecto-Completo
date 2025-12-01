import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar token Firebase automáticamente
api.interceptors.request.use(
    async (config) => {
        try {
            const user = window.firebase?.auth()?.currentUser;
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error obteniendo token de Firebase:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejo de errores de respuesta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("No autorizado - Token inválido o expirado");
            // Aquí puedes implementar redireccionamiento a login si lo necesitas
        }
        if (error.response?.status === 403) {
            console.error("Acceso denegado - Permiso insuficiente");
        }
        return Promise.reject(error);
    }
);

export default api;
