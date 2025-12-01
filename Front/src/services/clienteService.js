import api from "../api/axiosConfig";

// Los clientes se obtienen del endpoint de usuarios con rol de cliente
export const getClientes = async () => {
    try {
        const response = await api.get("/api/usuarios?role=cliente");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo clientes:", error);
        throw error;
    }
};

export const getClienteById = async (id) => {
    try {
        const response = await api.get(`/api/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo cliente ${id}:`, error);
        throw error;
    }
};

export const createCliente = async (data) => {
    try {
        const response = await api.post("/api/usuarios", { ...data, role: "cliente" });
        return response.data;
    } catch (error) {
        console.error("Error creando cliente:", error);
        throw error;
    }
};

export const updateCliente = async (id, data) => {
    try {
        const response = await api.put(`/api/usuarios/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando cliente ${id}:`, error);
        throw error;
    }
};

export const deleteCliente = async (id) => {
    try {
        await api.delete(`/api/usuarios/${id}`);
    } catch (error) {
        console.error(`Error eliminando cliente ${id}:`, error);
        throw error;
    }
};
