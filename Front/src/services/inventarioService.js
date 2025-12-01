import api from "../api/axiosConfig";

export const getInventario = async () => {
    try {
        const response = await api.get("/api/inventario");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo inventario:", error);
        throw error;
    }
};

export const getInventarioById = async (id) => {
    try {
        const response = await api.get(`/api/inventario/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo item de inventario ${id}:`, error);
        throw error;
    }
};

export const createInventario = async (data) => {
    try {
        const response = await api.post("/api/inventario", data);
        return response.data;
    } catch (error) {
        console.error("Error creando item de inventario:", error);
        throw error;
    }
};

export const updateInventario = async (id, data) => {
    try {
        const response = await api.put(`/api/inventario/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando inventario ${id}:`, error);
        throw error;
    }
};

export const deleteInventario = async (id) => {
    try {
        await api.delete(`/api/inventario/${id}`);
    } catch (error) {
        console.error(`Error eliminando inventario ${id}:`, error);
        throw error;
    }
};
