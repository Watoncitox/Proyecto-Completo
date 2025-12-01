import api from "../api/axiosConfig";

export const getHorarios = async () => {
    try {
        const response = await api.get("/api/horarios");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo horarios:", error);
        throw error;
    }
};

export const getHorarioById = async (id) => {
    try {
        const response = await api.get(`/api/horarios/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo horario ${id}:`, error);
        throw error;
    }
};

export const createHorario = async (data) => {
    try {
        const response = await api.post("/api/horarios", data);
        return response.data;
    } catch (error) {
        console.error("Error creando horario:", error);
        throw error;
    }
};

export const updateHorario = async (id, data) => {
    try {
        const response = await api.put(`/api/horarios/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando horario ${id}:`, error);
        throw error;
    }
};

export const deleteHorario = async (id) => {
    try {
        await api.delete(`/api/horarios/${id}`);
    } catch (error) {
        console.error(`Error eliminando horario ${id}:`, error);
        throw error;
    }
};
