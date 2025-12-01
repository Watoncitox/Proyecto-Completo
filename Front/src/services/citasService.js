import api from "./api";

export const getCitas = () => api.get("/cita");
export const getCitaById = (id) => api.get(`/cita/${id}`);
export const createCita = (data) => api.post("/cita", data);
export const updateCita = (id, data) => api.put(`/cita/${id}`, data);
export const deleteCita = (id) => api.delete(`/cita/${id}`);
