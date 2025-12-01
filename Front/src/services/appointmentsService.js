/** Simple localStorage-backed service for appointments (citas) */
const KEY = "citas";

function startOfDay(d) {
  const dt = new Date(d);
  dt.setHours(0,0,0,0);
  return dt.getTime();
}

function seed() {
  if (!localStorage.getItem(KEY)) {
    const now = new Date();
    const today = startOfDay(now);
    const day = 24*60*60*1000;
    const initial = [
      { id: "c1", cliente: "Ana Pérez", servicio: "Corte", fechaHora: new Date(today + 10*60*60*1000).toISOString(), estado: "pendiente" },
      { id: "c2", cliente: "Luis Díaz", servicio: "Tintura", fechaHora: new Date(today + 13*60*60*1000).toISOString(), estado: "pendiente" },
      { id: "c3", cliente: "María Soto", servicio: "Peinado", fechaHora: new Date(today + day + 9*60*60*1000).toISOString(), estado: "pendiente" },
      { id: "c4", cliente: "Camila Rojas", servicio: "Manicure", fechaHora: new Date(today + 2*day + 16*60*60*1000).toISOString(), estado: "pendiente" },
    ];
    localStorage.setItem(KEY, JSON.stringify(initial));
  }
}

export function listCitas() {
  seed();
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function citasDeRango(inicioIso, finIso) {
  const ini = new Date(inicioIso).getTime();
  const fin = new Date(finIso).getTime();
  return listCitas().filter(c => {
    const t = new Date(c.fechaHora).getTime();
    return t >= ini && t < fin;
  });
}

export function actualizarEstado(id, estado) {
  const list = listCitas().map(c => c.id === id ? { ...c, estado } : c);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function agregarCita(cita) {
  const list = listCitas();
  list.push(cita);
  localStorage.setItem(KEY, JSON.stringify(list));
}
