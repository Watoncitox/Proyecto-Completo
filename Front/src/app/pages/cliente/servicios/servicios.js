// src/app/pages/cliente/servicios/Servicios.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./servicio.css";

import HeroBanner from "../../../components/Hero/HeroBanner";
import GlobalCard from "../../../components/Card/Global-Card/Global-Card";

// Imágenes de categorías
import cosmetologiaImg from "../../../assets/img/servicios/cosmetologia.jpg";
import corporalesImg from "../../../assets/img/servicios/corporales.jpg";
import manicureImg from "../../../assets/img/servicios/manicure.jpg";
import corteImg from "../../../assets/img/servicios/corte.jpg";
import maquillajeImg from "../../../assets/img/servicios/maquillaje.jpg";
import capilaresImg from "../../../assets/img/servicios/capilares.jpg";

// Imagen fondo del Hero
import fondoServicios from "../../../assets/img/fondo/servicios/fondo_servicio.png";

// Carrito: removed accidental top-level hook usage (useCart) and erroneous addToCart call

const categorias = [
    {
        titulo: "Cosmetología",
        descripcion: "Tratamientos faciales avanzados para el cuidado de tu piel.",
        imagen: cosmetologiaImg,
        link: "/servicios/cosmetologia",
    },
    {
        titulo: "Tratamientos Corporales y Spa",
        descripcion: "Relajación, bienestar y equilibrio para cuerpo y mente.",
        imagen: corporalesImg,
        link: "/servicios/corporales",
    },
    {
        titulo: "Manicure y Pedicure",
        descripcion: "Cuidado, hidratación y diseño profesional de uñas.",
        imagen: manicureImg,
        link: "/servicios/manicure",
    },
    {
        titulo: "Corte, Estilismo y Color",
        descripcion: "Transforma tu look con técnicas modernas y personalizadas.",
        imagen: corteImg,
        link: "/servicios/corte-y-color",
    },
    {
        titulo: "Maquillaje Profesional",
        descripcion: "Maquillaje para eventos, sesiones y ocasiones especiales.",
        imagen: maquillajeImg,
        link: "/servicios/maquillaje",
    },
    {
        titulo: "Tratamientos Capilares",
        descripcion: "Recuperación, hidratación y fortalecimiento del cabello.",
        imagen: capilaresImg,
        link: "/servicios/capilares",
    },
];

export default function Servicios() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Nuestros Servicios"
                    subtitle="Conoce todas las especialidades que Style & Beauty tiene para ti"
                    buttonText="Agendar hora"
                    buttonLink="/agendar-hora"
                    backgroundImage={fondoServicios}
                    gradient="rgba(0, 0, 0, 0.55)"
                    textGradient="linear-gradient(90deg, #ff8dcf, #b36bff)"
                />
            </div>

            <Container className="my-5">
                <Row className="text-center mb-4">
                    <h2 className="fw-bold text-secondary">Especialidades</h2>
                    <p className="text-muted">
                        Selecciona una categoría para ver todos los servicios disponibles.
                    </p>
                </Row>

                <Row>
                    {categorias.map((cat, index) => (
                        <Col
                            key={index}
                            lg={4}
                            md={6}
                            sm={12}
                            className="mb-4 d-flex justify-content-center"
                        >
                            <GlobalCard
                                image={cat.imagen}
                                title={cat.titulo}
                                description={cat.descripcion}
                                ctaText="Ver más"
                                ctaLink={cat.link}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
