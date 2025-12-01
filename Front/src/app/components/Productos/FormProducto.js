import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';

export default function FormProducto({ onSave, editItem }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "" });
  const { notify } = useAuth();

  useEffect(() => {
    if (editItem) {
      setForm({
        nombre: editItem.nombre || "",
        descripcion: editItem.descripcion || "",
        precio: editItem.precio || ""
      });
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      notify({ title: 'Error', body: 'Faltan datos', variant: 'warning' });
      return;
    }
    onSave({ ...form, precio: Number(form.precio) });
    setForm({ nombre: "", descripcion: "", precio: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-3">
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Nombre"
            value={form.nombre} onChange={(e)=>setForm({...form, nombre:e.target.value})}/>
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Descripción"
            value={form.descripcion} onChange={(e)=>setForm({...form, descripcion:e.target.value})}/>
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Precio"
            value={form.precio} onChange={(e)=>setForm({...form, precio:e.target.value})}/>
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" type="submit">
            {editItem ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    </form>
  );
}
