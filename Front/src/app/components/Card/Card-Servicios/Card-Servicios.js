// src/app/components/Card/Card-Servicios/Card-Servicios.js
import React from "react";
import { useNavigate } from "react-router-dom";
import CardBase from "../CardBase";
import "./Card-Servicios.css";

export default function CardServicios({ titulo, imagen, link }) {
  const navigate = useNavigate();

  return (
    <CardBase
      image={imagen}
      title={titulo}
      buttonText="Ver más detalles"
      onButtonClick={() => navigate(link)}
      className="card-servicio"
      height={220}
    />
  );
}
