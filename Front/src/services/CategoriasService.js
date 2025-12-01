import api from "../api/axiosConfig";

export const getCategorias = async () => {
    try {
        const response = await api.get("/api/categorias-servicios");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo categorías de servicios:", error);
        throw error;
    }
};

export const getCategoriaById = async (id) => {
    try {
        const response = await api.get(`/api/categorias-servicios/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo categoría ${id}:`, error);
        throw error;
    }
};

export const createCategoria = async (data) => {
    try {
        const response = await api.post("/api/categorias-servicios", data);
        return response.data;
    } catch (error) {
        console.error("Error creando categoría:", error);
        throw error;
    }
};

export const updateCategoria = async (id, data) => {
    try {
        const response = await api.put(`/api/categorias-servicios/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando categoría ${id}:`, error);
        throw error;
    }
};

export const deleteCategoria = async (id) => {
    try {
        await api.delete(`/api/categorias-servicios/${id}`);
    } catch (error) {
        console.error(`Error eliminando categoría ${id}:`, error);
        throw error;
    }
};
