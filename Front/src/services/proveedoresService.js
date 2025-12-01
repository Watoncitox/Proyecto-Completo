import api from "../api/axiosConfig";

export const getProveedores = async () => {
    try {
        const response = await api.get("/api/proveedores");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo proveedores:", error);
        throw error;
    }
};

export const getProveedorById = async (id) => {
    try {
        const response = await api.get(`/api/proveedores/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo proveedor ${id}:`, error);
        throw error;
    }
};

export const createProveedor = async (data) => {
    try {
        const response = await api.post("/api/proveedores", data);
        return response.data;
    } catch (error) {
        console.error("Error creando proveedor:", error);
        throw error;
    }
};

export const updateProveedor = async (id, data) => {
    try {
        const response = await api.put(`/api/proveedores/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando proveedor ${id}:`, error);
        throw error;
    }
};

export const deleteProveedor = async (id) => {
    try {
        await api.delete(`/api/proveedores/${id}`);
    } catch (error) {
        console.error(`Error eliminando proveedor ${id}:`, error);
        throw error;
    }
};
