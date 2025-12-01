import React from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarCliente from "../../../../components/Navbar/Navbar-cliente";
import HeroBanner from "../../../../components/Hero/HeroBanner";
import "./kerastase.css";
import { useCart } from "../../../../hooks/useCart";
import kerastaseImg from "../../../../assets/img/fondo/Productos/kerastase.jpg";
import { getProductosNormalized as getProductos } from '../../../../../services/productsService';

const Kerastase = () => {
    const { id } = useParams();
    const all = getProductos();
    // find by id if provided
    let producto = null;
    if (id) producto = all.find(p => String(p.id) === String(id));
    // otherwise pick first in category 'kerastase'
    if (!producto) producto = all.find(p => p.categoria === 'kerastase') || all[0] || null;
    const { addToCart } = useCart();

    if (!producto) {
        return (
            <div className="background-detalle">
                <NavbarCliente />
                <Container className="py-5"><p>No hay productos disponibles.</p></Container>
            </div>
        );
    }

    const imgSrc = producto.imagen || kerastaseImg;
    const beneficios = producto.beneficios || [];

    return (
        <div className="background-detalle">
            <NavbarCliente />

            <div className="page-hero container-fluid py-5">
                <HeroBanner
                    title="Kerastase"
                    subtitle="Productos capilares premium"
                    backgroundImage={kerastaseImg}
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

                        <Button
                            variant="danger"
                            className="btn-add"
                            onClick={() => addToCart({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen })}
                        >
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

export default Kerastase;