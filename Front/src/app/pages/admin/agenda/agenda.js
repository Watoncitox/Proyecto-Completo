import React, { useEffect, useMemo, useState } from "react";
// NavbarAdmin is provided globally by App.js when the user is admin.
import "./agenda.css";

import HeroBanner from "../../../components/Hero/HeroBanner";
import { Card, Button, ListGroup, Container, Modal, Form } from "react-bootstrap";
import { listCitas, agregarCita } from "../../../../services/appointmentsService";
import { servicesService } from "../../../../services/servicesService";

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}

export default function AgendaAdmin() {
  const [fecha, setFecha] = useState(new Date());
  const [citas, setCitas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newForm, setNewForm] = useState({ fecha: '', categoria: '', servicio: '', hora: '', cliente: '', abonoRealizado: false, abono: '' });
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const monthName = fecha.toLocaleString('es-CL', { month: 'long' });
  const displayMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  useEffect(() => {
    setCitas(listCitas());
    setServices(servicesService.getServices().filter(s => s.active));
  }, []);

  // recompute available slots when selectedDate, services or selected service change
  useEffect(() => {
    if (selectedDate && newForm.servicio) computeAvailableSlots(newForm.servicio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, services, newForm.servicio]);

  function minutesToMs(m) { return m * 60 * 1000; }

  function computeAvailableSlots(serviceName) {
    if (!selectedDate || !serviceName) {
      setAvailableSlots([]);
      return;
    }
    const svc = services.find(s => s.name === serviceName);
    const duration = svc ? Number(svc.duration || 60) : 60; // minutes

    // working hours
    const day = new Date(selectedDate);
    const workStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 9, 0, 0, 0).getTime();
    const workEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 18, 0, 0, 0).getTime();

    // existing appointments as occupied intervals
    const ocupadas = citasPorDia(selectedDate).map(c => {
      const start = new Date(c.fechaHora).getTime();
      // try to find duration from services list by name
      const s = services.find(x => x.name === c.servicio);
      const dur = s ? Number(s.duration || 60) : 60;
      return { start, end: start + minutesToMs(dur) };
    });

    const step = 30; // minutes increments
    const slots = [];
    for (let t = workStart; t + minutesToMs(duration) <= workEnd; t += minutesToMs(step)) {
      const slotStart = t;
      const slotEnd = t + minutesToMs(duration);
      const overlaps = ocupadas.some(o => !(slotEnd <= o.start || slotStart >= o.end));
      if (!overlaps) {
        const dt = new Date(slotStart);
        const hh = dt.getHours().toString().padStart(2, '0');
        const mm = dt.getMinutes().toString().padStart(2, '0');
        slots.push(`${hh}:${mm}`);
      }
    }
    setAvailableSlots(slots);
  }

  const grid = useMemo(() => {
    const total = daysInMonth(fecha.getFullYear(), fecha.getMonth());
    const weeks = [];
    let week = new Array(7).fill(null);
    const firstDay = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    let dayCounter = 1;

    // fill leading blanks (Sunday=0 ...)
    for (let i = 0; i < firstDay; i++) week[i] = null;

    while (dayCounter <= total) {
      const dayOfWeek = (firstDay + dayCounter - 1) % 7;
      const d = new Date(fecha.getFullYear(), fecha.getMonth(), dayCounter);
      const dayKey = d.toDateString();
      const delDia = citas.filter((c) => new Date(c.fechaHora).toDateString() === dayKey);
      week[dayOfWeek] = { d, citas: delDia };
      if (dayOfWeek === 6 || dayCounter === total) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
      dayCounter++;
    }
    return weeks;
  }, [fecha, citas]);

  // helper to get citas for a given Date object
  const citasPorDia = (d) => citas.filter(c => new Date(c.fechaHora).toDateString() === d.toDateString());

  return (
    <>
      <div className="page-hero admin-hero container-fluid py-5">
        <HeroBanner title="Agenda" subtitle="Visualiza y gestiona las citas programadas" gradient="rgba(0,0,0,0.45)" showButton={false} />
      </div>

      <Container className="mt-4 pt-4 agenda-page">
        <div className="d-flex align-items-center mb-3">
          <h2 className="mb-0">{`Agenda de ${displayMonth}`}</h2>
          <div className="d-flex gap-2 align-items-center ms-3">
            <Button variant="outline-secondary" onClick={() => setFecha(new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1))}>◀</Button>
            <Button variant="outline-secondary" onClick={() => setFecha(new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1))}>▶</Button>
          </div>
        </div>

        <div className="d-flex gap-4">
          {/* Calendar */}
          <div style={{ flex: 1 }}>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  {['Dom','Lun','Mar','Mie','Jue','Vie','Sab'].map(d=> <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {grid.map((week, wi) => (
                  <tr key={wi}>
                    {week.map((cell, ci) => (
                      <td key={ci} style={{ verticalAlign: 'top', height: 90, cursor: cell ? 'pointer' : 'default' }} onClick={() => cell && setSelectedDate(cell.d)}>
                        {cell ? (
                          <div>
                            <div style={{ fontWeight: 600 }}>{cell.d.getDate()}</div>
                            <div style={{ height: 8 }} />
                            {/* green dot if there are citas */}
                            {cell.citas && cell.citas.length > 0 && (
                              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                                <span style={{ width: 10, height: 10, borderRadius: 10, background: '#28a745', display: 'inline-block' }} />
                              </div>
                            )}
                          </div>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Side panel: details for selected day */}
          <div style={{ width: 420 }}>
            <div className="mb-4">
              <Button variant="success" className="w-100" onClick={() => {
                if (!selectedDate) {
                  alert('Selecciona primero un día en el calendario.');
                  return;
                }
                // prefill the form date to the selected date (YYYY-MM-DD) and reset selections
                const datePart = selectedDate.toISOString().slice(0,10);
                setNewForm({ fecha: datePart, categoria: '', servicio: '', hora: '', cliente: '', abonoRealizado: false, abono: '' });
                setAvailableSlots([]);
                setShowNewModal(true);
              }}>+ Agendar cita</Button>
            </div>
            <Card>
              <Card.Header>
                {selectedDate ? `Citas ${selectedDate.toLocaleDateString('es-CL')}` : 'Seleccione un día'}
              </Card.Header>
              <Card.Body style={{ maxHeight: 480, overflowY: 'auto' }}>
                {/* Spacer above the list removed (button moved outside) */}
                {!selectedDate && <div className="text-muted">Haz click en un día del calendario para ver sus citas.</div>}
                {selectedDate && (
                  (() => {
                    const lista = citasPorDia(selectedDate).sort((a,b)=> new Date(a.fechaHora)-new Date(b.fechaHora));
                    if (!lista.length) return <div className="text-muted">No hay citas para este día.</div>;
                    return (
                      <ListGroup variant="flush">
                        {lista.map(c => (
                          <ListGroup.Item key={c.id} className="py-2">
                            <div className="d-flex justify-content-between">
                              <div>
                                <div className="fw-semibold">{c.servicio}</div>
                                <div className="small text-muted">{c.cliente}</div>
                              </div>
                              <div className="text-end">
                                <div className="fw-semibold">{new Date(c.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                <div className="small text-muted">{c.abono ? `Abono: ${c.abono}` : 'Sin abono'}</div>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    );
                  })()
                )}
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* New appointment modal */}
        <Modal show={showNewModal} onHide={() => setShowNewModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Agendar nueva cita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Fecha seleccionada</Form.Label>
                <Form.Control type="text" readOnly value={selectedDate ? selectedDate.toLocaleDateString('es-CL') : ''} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select value={newForm.categoria} onChange={(e) => {
                  const cat = e.target.value;
                  setNewForm(s => ({ ...s, categoria: cat, servicio: '', hora: '' }));
                  setAvailableSlots([]);
                }}>
                  <option value="">-- seleccionar categoría --</option>
                  {Array.from(new Set(services.map(s => s.category))).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Servicio</Form.Label>
                <Form.Select value={newForm.servicio} onChange={(e) => {
                  const svc = e.target.value;
                  setNewForm(s => ({ ...s, servicio: svc, hora: '' }));
                  // compute slots for this service
                  computeAvailableSlots(svc);
                }}>
                  <option value="">-- seleccionar servicio --</option>
                  {services.filter(s => !newForm.categoria || s.category === newForm.categoria).map(s => <option key={s.id} value={s.name}>{s.name} ({s.duration}min)</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Horas disponibles</Form.Label>
                <Form.Select value={newForm.hora} onChange={(e) => setNewForm(s=>({...s, hora: e.target.value}))} disabled={!availableSlots.length}>
                  <option value="">-- seleccionar hora --</option>
                  {availableSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Select>
                {!availableSlots.length && newForm.servicio && <div className="small text-muted mt-1">No hay horas disponibles para este servicio en la fecha seleccionada.</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre cliente</Form.Label>
                <Form.Control value={newForm.cliente} onChange={(e) => setNewForm(s=>({...s, cliente: e.target.value}))} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Abono realizado" checked={!!newForm.abonoRealizado} onChange={(e) => setNewForm(s=>({...s, abonoRealizado: e.target.checked, abono: e.target.checked ? s.abono : ''}))} />
              </Form.Group>

              {newForm.abonoRealizado && (
                <Form.Group className="mb-3">
                  <Form.Label>Monto abono</Form.Label>
                  <Form.Control type="number" value={newForm.abono} onChange={(e) => setNewForm(s=>({...s, abono: e.target.value}))} />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowNewModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => {
              // validate
              if (!selectedDate || !newForm.hora || !newForm.servicio || !newForm.cliente) {
                alert('Selecciona un día y completa hora, servicio y nombre del cliente.');
                return;
              }
              const datePart = selectedDate.toISOString().slice(0,10);
              const iso = new Date(`${datePart}T${newForm.hora}`).toISOString();
              const cita = {
                id: `c${Date.now()}`,
                cliente: newForm.cliente,
                servicio: newForm.servicio,
                fechaHora: iso,
                estado: 'pendiente',
              };
              if (newForm.abonoRealizado) cita.abono = newForm.abono || 0;
              agregarCita(cita);
              // refresh state
              setCitas(listCitas());
              setShowNewModal(false);
              // if selected date matches, refresh selection
              const sel = selectedDate;
              if (sel && new Date(cita.fechaHora).toDateString() === sel.toDateString()) setSelectedDate(new Date(sel));
              // reset form
              setNewForm({ fecha: '', hora: '', servicio: '', cliente: '', abonoRealizado: false, abono: '' });
            }}>Guardar cita</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
