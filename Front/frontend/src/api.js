const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/services`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Error al obtener servicios');
  return res.json();
}

export async function sendContact(contact) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Error al enviar contacto: ' + text);
  }
  return res.json();
}