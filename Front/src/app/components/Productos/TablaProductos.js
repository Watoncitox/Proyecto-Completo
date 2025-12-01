import React from "react";

export default function TablaProductos({ data, onEdit, onDelete }) {
  return (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th style={{ width: 180 }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan="4" className="text-muted">Sin productos</td></tr>
        ) : data.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td>{p.descripcion}</td>
            <td>${Number(p.precio || 0).toLocaleString("es-CL")}</td>
            <td>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>onEdit(p)}>Editar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>onDelete(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
