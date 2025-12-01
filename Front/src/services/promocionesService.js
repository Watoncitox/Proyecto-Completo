import api from "../api/axiosConfig";

export const getPromociones = async () => {
    try {
        const response = await api.get("/api/promociones");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo promociones:", error);
        throw error;
    }
};

export const getPromocionById = async (id) => {
    try {
        const response = await api.get(`/api/promociones/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo promoción ${id}:`, error);
        throw error;
    }
};

export const createPromocion = async (data) => {
    try {
        const response = await api.post("/api/promociones", data);
        return response.data;
    } catch (error) {
        console.error("Error creando promoción:", error);
        throw error;
    }
};

export const updatePromocion = async (id, data) => {
    try {
        const response = await api.put(`/api/promociones/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando promoción ${id}:`, error);
        throw error;
    }
};

export const deletePromocion = async (id) => {
    try {
        await api.delete(`/api/promociones/${id}`);
    } catch (error) {
        console.error(`Error eliminando promoción ${id}:`, error);
        throw error;
    }
};
