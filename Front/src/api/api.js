import axios from "axios";

// URL de tu backend Spring Boot
const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar token Firebase automáticamente
api.interceptors.request.use(async (config) => {
    const user = window.firebase?.auth()?.currentUser;

    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
