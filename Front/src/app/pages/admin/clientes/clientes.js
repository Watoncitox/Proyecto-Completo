import "./clientes.css";
import React, { useEffect, useMemo, useState } from "react";
import HeroBanner from "../../../components/Hero/HeroBanner";
import { Table, Button, Container, Modal, ListGroup, Pagination, Form } from "react-bootstrap";

import { listCitas } from "../../../../services/appointmentsService";

// (no longer used) previously helper to check next N days

export default function ClientesAdmin() {
  const [citas, setCitas] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [showModal, setShowModal] = useState(false);
  const [modalClient, setModalClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCitas(listCitas());
  }, []);

  // derive unique clients from citas
  const clients = useMemo(() => {
    const map = new Map();
    citas.forEach(c => {
      const key = (c.cliente || 'Sin nombre').trim();
      if (!map.has(key)) map.set(key, { id: key, nombre: key, rut: c.rut || '-', citas: [] });
      map.get(key).citas.push(c);
    });
    // compute last service for each client
    return Array.from(map.values()).map((cl) => {
      const sorted = cl.citas.slice().sort((a,b)=> new Date(b.fechaHora)-new Date(a.fechaHora));
      return { ...cl, lastService: sorted[0] || null };
    });
  }, [citas]);

  const filteredClients = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(c => (c.nombre || '').toLowerCase().includes(q));
  }, [clients, searchQuery]);

  const total = filteredClients.length;
  const paginated = filteredClients.slice((page-1)*pageSize, page*pageSize);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(total / pageSize));
    if (page > pages) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const openDetails = (client) => {
    setModalClient({ ...client, citas: (client.citas||[]).slice().sort((a,b)=> new Date(b.fechaHora)-new Date(a.fechaHora)) });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalClient(null);
  };

  return (
    <>
      <div className="page-hero admin-hero container-fluid py-5">
        <HeroBanner title="Listado Clientes" subtitle="Detalle de cada cliente y sus ultimas citas" gradient="rgba(0,0,0,0.45)" showButton={false} />
      </div>

      <Container className="mt-4 pt-4 clientes-page">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center" style={{ gap: 16 }}>
            <h2 className="mb-0">Clientes</h2>
            <div style={{ width: 320 }}>
              <Form.Control placeholder="Buscar por nombre" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="text-muted">{`${Math.min(pageSize, total)}/${total}`}</div>
        </div>

        <div className="shadow-lg rounded bg-white p-4">
          <Table bordered hover responsive className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th className="text-start">Nombre</th>
                <th>RUT</th>
                <th>Último servicio</th>
                <th>Fecha / Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cl) => (
                <tr key={cl.id}>
                  <td>{cl.id}</td>
                  <td className="text-start">{cl.nombre}</td>
                  <td>{cl.rut || '-'}</td>
                  <td>{cl.lastService ? cl.lastService.servicio : '-'}</td>
                  <td>{cl.lastService ? new Date(cl.lastService.fechaHora).toLocaleString() : '-'}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Button size="sm" variant="outline-primary" onClick={() => openDetails(cl)}>Detalles</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {total === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No hay clientes registrados</td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">Mostrando {Math.min(pageSize, total)} de {total}</div>
            <Pagination>
              <Pagination.Prev onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} />
              {Array.from({length: Math.max(1, Math.ceil(total/pageSize))}).map((_, i) => (
                <Pagination.Item key={i} active={i+1===page} onClick={() => setPage(i+1)}>{i+1}</Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setPage(p => Math.min(Math.ceil(total/pageSize), p+1))} disabled={page===Math.ceil(total/pageSize) || total===0} />
            </Pagination>
          </div>
        </div>

        {/* Details modal */}
        <Modal show={showModal} onHide={closeModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Historial de servicios: {modalClient ? modalClient.nombre : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!modalClient && <div>Cargando...</div>}
            {modalClient && (
              <ListGroup>
                {modalClient.citas.map(c => (
                  <ListGroup.Item key={c.id} className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-semibold">{c.servicio}</div>
                      <div className="small text-muted">{c.cliente}</div>
                    </div>
                    <div className="text-end small text-muted">{new Date(c.fechaHora).toLocaleString()}</div>
                  </ListGroup.Item>
                ))}
                {modalClient.citas.length === 0 && <ListGroup.Item className="text-muted">No hay servicios registrados</ListGroup.Item>}
              </ListGroup>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
