import api from "../api/axiosConfig";

export const loginWithFirebaseToken = async (idToken) => {
    try {
        const response = await api.post("/auth/login", { idToken });
        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        // Puedes agregar una llamada al backend si es necesario
        return Promise.resolve({ success: true });
    } catch (error) {
        console.error("Error en logout:", error);
        throw error;
    }
};
