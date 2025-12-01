import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavbarCliente from '../../../components/Navbar/Navbar-cliente';
import HeroBanner from '../../../components/Hero/HeroBanner';
import { getProducto } from '../../../../services/productsService';
import { useCart } from '../../../hooks/useCart';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const p = getProducto(id);
    setProducto(p);
  }, [id]);

  if (!producto) {
    return (
      <div className="background-gradient">
        <NavbarCliente />
        <Container className="py-5">
          <HeroBanner title="Producto no encontrado" subtitle="El producto solicitado no existe en el catálogo" showButton={false} />
          <p className="text-center mt-4 text-muted">No se encontró el producto. Verifica el enlace o regresa al catálogo.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="background-gradient">
      <NavbarCliente />
      <div className="container-fluid py-5">
        <HeroBanner title={producto.nombre} subtitle={`Precio: $${Number(producto.precio || 0).toLocaleString('es-CL')}`} backgroundImage={producto.imagen} showButton={false} />
      </div>
      <Container className="my-4">
        <Row>
          <Col md={6}>
            {producto.imagen ? (
              <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: 360, background: '#f3f3f3', borderRadius: 8 }} />
            )}
          </Col>
          <Col md={6}>
            <h2>{producto.nombre}</h2>
            <p className="text-muted">{producto.descripcion}</p>
            <h3 className="text-primary">${Number(producto.precio || 0).toLocaleString('es-CL')}</h3>
            <div className="mt-4">
              <Button variant="danger" className="me-2" onClick={() => addToCart(producto)}>Agregar al carrito</Button>
              <Button variant="outline-primary">Comprar ahora</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
