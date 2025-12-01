// src/app/components/Card/Card-Usuario/Card-Usuario.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CardBase from "../CardBase";
import "./Card-Usuario.css";

export default function CardUsuario({ usuario, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    rut: usuario?.rut || "",
    estado: usuario?.estado || "",
    especialidad: usuario?.especialidad || "",
    experiencia: usuario?.experiencia || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(form);
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <CardBase
        image="/path/to/profile.jpg"
        title={form.nombre || "Usuario"}
        text={`${form.email || '—'} • ${form.telefono || '—'} • ${form.rut || '—'} • ${form.estado || '—'} • ${form.especialidad || '—'} • ${form.experiencia || '—'}`}
        buttonText="Editar"
        onButtonClick={() => setEditMode(true)}
        className="card-usuario"
      />
    );
  }

  return (
    <div className="card-usuario p-3 shadow-sm rounded-4">
      <h5 className="fw-bold mb-3">Editar Usuario</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" value={form.nombre} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={form.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>RUT</Form.Label>
          <Form.Control name="rut" value={form.rut} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control name="telefono" value={form.telefono} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select name="estado" value={form.estado} onChange={handleChange}>
            <option value="">Seleccione...</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control name="especialidad" value={form.especialidad} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Experiencia</Form.Label>
          <Form.Control as="textarea" rows={3} name="experiencia" value={form.experiencia} onChange={handleChange} />
        </Form.Group>
        <Button variant="success" onClick={handleSave} className="w-100 rounded-pill">
          Guardar Cambios
        </Button>
      </Form>
    </div>
  );
}
