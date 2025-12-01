import api from "../api/axiosConfig";

export const getUsuarios = async () => {
    try {
        const response = await api.get("/api/usuarios");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        throw error;
    }
};

export const getUsuarioById = async (id) => {
    try {
        const response = await api.get(`/api/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo usuario ${id}:`, error);
        throw error;
    }
};

export const createUsuario = async (data) => {
    try {
        const response = await api.post("/api/usuarios", data);
        return response.data;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
};

export const updateUsuario = async (id, data) => {
    try {
        const response = await api.put(`/api/usuarios/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando usuario ${id}:`, error);
        throw error;
    }
};
