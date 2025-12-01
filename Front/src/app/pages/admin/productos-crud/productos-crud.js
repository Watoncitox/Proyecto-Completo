import React, { useEffect, useState } from "react";
import "./productos-crud.css";
import HeroBanner from "../../../components/Hero/HeroBanner";
import { Container, Table, Button, Form, Modal, Alert } from "react-bootstrap";
import { getProductosNormalized, createProducto, updateProducto, deleteProducto } from "../../../../services/productsService";

export default function ProductosCRUD() {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", imagen: "", stock: 0, proveedor: "", disponible: true, categoria: 'general' });
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setList(getProductosNormalized());
  }, []);

  const refresh = () => setList(getProductosNormalized());

  const handleSave = () => {
    // Validate
    if (!form.nombre || form.nombre.trim() === "") {
      setMessage({ type: 'danger', text: 'El nombre es obligatorio.' });
      return;
    }
    if (form.precio === "" || isNaN(Number(form.precio)) || Number(form.precio) < 0) {
      setMessage({ type: 'danger', text: 'Precio inválido.' });
      return;
    }

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen: form.imagen,
      stock: Number(form.stock || 0),
      proveedor: form.proveedor,
      categoria: form.categoria || 'general',
      disponible: !!form.disponible,
    };

    if (editItem) {
      updateProducto(editItem.id, { ...editItem, ...payload });
      setMessage({ type: 'success', text: 'Producto actualizado.' });
    } else {
      const id = `p${Date.now()}`;
      createProducto({ id, ...payload });
      setMessage({ type: 'success', text: 'Producto creado.' });
    }

    setTimeout(() => setMessage(null), 3000);
    setShowModal(false);
    setEditItem(null);
    setForm({ nombre: "", descripcion: "", precio: "", imagen: "", stock: 0, proveedor: "", disponible: true });
    setFileName("");
    refresh();
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    deleteProducto(id);
    setMessage({ type: 'warning', text: 'Producto eliminado.' });
    setTimeout(() => setMessage(null), 3000);
    refresh();
  };

  const openNew = () => {
    setEditItem(null);
    setForm({ nombre: "", descripcion: "", precio: "", imagen: "", stock: 0, proveedor: "", disponible: true });
    setFileName("");
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditItem(p);
    setForm({ nombre: p.nombre || "", descripcion: p.descripcion || "", precio: p.precio || "", imagen: p.imagen || "", stock: p.stock || 0, proveedor: p.proveedor || "", disponible: p.disponible !== false });
    setFileName("");
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((s) => ({ ...s, imagen: ev.target.result }));
    };
    reader.readAsDataURL(f);
  };

  return (
    <>
      <div className="page-hero admin-hero container-fluid py-5">
        <HeroBanner title="Gestion Productos" subtitle="Administra el catálogo de productos" gradient="rgba(0,0,0,0.45)" showButton={false} />
      </div>

      <Container className="productos-crud-page mt-4 pt-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fw-bold text-dark">Gestión de Productos 🧴</h1>
          
            <Button variant="success" onClick={openNew}>+ Añadir Producto</Button>
          </header>

        {message && <Alert variant={message.type}>{message.text}</Alert>}

        <div className="shadow-lg rounded bg-white p-4">
          <Table striped bordered hover responsive className="text-center align-middle">
            <thead>
              <tr className="bg-light">
                <th>ID</th>
                <th className="text-start">Nombre</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Disponible</th>
                <th>Stock</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td className="text-start fw-medium">{p.nombre}</td>
                  <td>{p.categoria || '-'}</td>
                  <td style={{ maxWidth: 300 }} className="text-start">{p.descripcion ? (p.descripcion.length > 120 ? p.descripcion.slice(0, 117) + '...' : p.descripcion) : ''}</td>
                  <td>{p.precio}</td>
                  <td>
                    <span className={`badge ${p.disponible ? 'bg-success' : 'bg-danger'}`}>{p.disponible ? 'Sí' : 'No'}</span>
                  </td>
                  <td>{typeof p.stock !== 'undefined' ? p.stock : '-'}</td>
                  <td>{p.proveedor || '-'}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => openEdit(p)}>Editar</Button>
                      {/* <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>Eliminar</Button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal de creación/edición */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editItem ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={form.nombre} onChange={(e) => setForm((s) => ({ ...s, nombre: e.target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} value={form.descripcion} onChange={(e) => setForm((s) => ({ ...s, descripcion: e.target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" value={form.precio} onChange={(e) => setForm((s) => ({ ...s, precio: e.target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoria / Marca</Form.Label>
                <Form.Select value={form.categoria} onChange={(e) => setForm((s) => ({ ...s, categoria: e.target.value }))}>
                  <option value="general">General</option>
                  <option value="kerastase">Kerastase</option>
                  <option value="loreal">L'Oréal</option>
                  <option value="otros">Otros</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" value={form.stock} onChange={(e) => setForm((s) => ({ ...s, stock: e.target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Proveedor</Form.Label>
                <Form.Control value={form.proveedor} onChange={(e) => setForm((s) => ({ ...s, proveedor: e.target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                {fileName && <small className="text-muted">{fileName}</small>}
                {form.imagen && (
                  <div className="mt-3 text-center">
                    <img src={form.imagen} alt="preview" style={{ width: '100%', maxWidth: 240, borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }} />
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Disponible" checked={!!form.disponible} onChange={(e) => setForm((s) => ({ ...s, disponible: e.target.checked }))} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <div className="ms-auto d-flex gap-2">
              <Button variant="primary" onClick={handleSave}>{editItem ? 'Actualizar' : 'Crear'}</Button>
              {editItem && <Button variant="danger" onClick={() => { if (window.confirm('Eliminar este producto?')) { handleDelete(editItem.id); setShowModal(false); } }}>Eliminar</Button>}
            </div>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
