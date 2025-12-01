import api from "./api";

export const getServicios = () => api.get("/api/servicios");
export const getServicioById = (id) => api.get(`/api/servicios/${id}`);
export const createServicio = (data) => api.post("/api/servicios", data);
export const updateServicio = (id, data) => api.put(`/api/servicios/${id}`, data);
export const deleteServicio = (id) => api.delete(`/api/servicios/${id}`);
