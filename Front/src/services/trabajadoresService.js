import api from "../api/axiosConfig";

export const getTrabajadores = async () => {
    try {
        const response = await api.get("/api/trabajadores");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo trabajadores:", error);
        throw error;
    }
};

export const getTrabajadorById = async (id) => {
    try {
        const response = await api.get(`/api/trabajadores/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo trabajador ${id}:`, error);
        throw error;
    }
};

export const createTrabajador = async (data) => {
    try {
        const response = await api.post("/api/trabajadores", data);
        return response.data;
    } catch (error) {
        console.error("Error creando trabajador:", error);
        throw error;
    }
};

export const updateTrabajador = async (id, data) => {
    try {
        const response = await api.put(`/api/trabajadores/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando trabajador ${id}:`, error);
        throw error;
    }
};

export const deleteTrabajador = async (id) => {
    try {
        await api.delete(`/api/trabajadores/${id}`);
    } catch (error) {
        console.error(`Error eliminando trabajador ${id}:`, error);
        throw error;
    }
};
