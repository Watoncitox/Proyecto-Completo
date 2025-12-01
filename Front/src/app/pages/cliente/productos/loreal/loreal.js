import React from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarCliente from "../../../../components/Navbar/Navbar-cliente";
import HeroBanner from "../../../../components/Hero/HeroBanner";
import "../kerastase/kerastase.css";
import { useCart } from "../../../../hooks/useCart";
import lorealImg from "../../../../assets/img/fondo/Productos/loreal.jpg";
import { getProductosNormalized as getProductos } from '../../../../../services/productsService';

const Loreal = () => {
  const { id } = useParams();
  const all = getProductos();
  let producto = null;
  if (id) producto = all.find(p => String(p.id) === String(id));
  if (!producto) producto = all.find(p => p.categoria === 'loreal') || all[0] || null;
  const { addToCart } = useCart();

  if (!producto) return (
    <div className="background-detalle">
      <NavbarCliente />
      <Container className="py-5"><p>No hay productos disponibles.</p></Container>
    </div>
  );

  const imgSrc = producto.imagen || lorealImg;
  const beneficios = producto.beneficios || [];

  return (
    <div className="background-detalle">
      <NavbarCliente />

      <div className="page-hero container-fluid py-5">
        <HeroBanner
          title="L'Oréal Professionnel"
          subtitle="Productos profesionales para el cuidado del cabello"
          backgroundImage={lorealImg}
          showButton={false}
        />
      </div>

      <Container className="detalle-container">
        <Row className="align-items-center">
          <Col md={6}>
            <div className="img-frame">
              <img src={imgSrc} alt={producto.nombre} className="detalle-img" />
            </div>
          </Col>

          <Col md={6}>
            <h1 className="detalle-title">{producto.nombre}</h1>
            <p className="detalle-descripcion">{producto.descripcion}</p>

            {beneficios.length > 0 && (
              <>
                <h4 className="detalle-sub">Beneficios</h4>
                <ul className="detalle-list">
                  {beneficios.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="precio">${producto.precio}</h3>

            <Button variant="danger" className="btn-add" onClick={() => addToCart({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen })}>
              Agregar al carrito
            </Button>

            <Button variant="success" className="btn-buy">
              Comprar ahora
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Loreal;
