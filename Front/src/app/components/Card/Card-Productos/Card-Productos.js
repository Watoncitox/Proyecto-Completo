import React from "react";
import { Link } from "react-router-dom";
import "./MarcaCard.css";

const MarcaCard = ({ titulo, imagen, descripcion, beneficios, parrafos, reverse, link }) => {
  return (
    <section className="about-section">
      <div
        className={`about-content ${reverse ? "flex-row-reverse" : ""}`}
        data-aos="fade-up"
      >
        <div className="about-img-container">
          <img src={imagen} alt={titulo} className="about-img" />
        </div>
        <div className="about-info">
          <h2>{titulo}</h2>

          {descripcion && <p>{descripcion}</p>}

          {parrafos?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {beneficios && beneficios.length > 0 && (
            <>
              <strong>Beneficios de {titulo}:</strong>
              <ul>
                {beneficios.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}
          {/* Botón para ir a la vista de la marca si se provee `link` */}
          {typeof link !== 'undefined' && (
            <div className="mt-3">
              <Link to={link} className="btn btn-outline-primary">Ver productos de {titulo}</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarcaCard;
