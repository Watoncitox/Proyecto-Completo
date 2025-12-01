// src/app/pages/cliente/servicios/ManicurePedicure.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./manicure-pedicure.css";

import HeroBanner from "../../../../components/Hero/HeroBanner";
import GlobalCard from "../../../../components/Card/Global-Card/Global-Card";

import fondo from "../../../../assets/img/fondo/servicios/fondo_servicio.png";
import manicureImg from "../../../../assets/img/servicios/manicure.jpg";

const servicios = [
    {
        nombre: "Manicure Spa",
        descripcion:
            "Incluye exfoliación, hidratación profunda y esmaltado profesional.",
        imagen: manicureImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Pedicure Spa",
        descripcion:
            "Tratamiento completo para suavizar, hidratar y revitalizar tus pies.",
        imagen: manicureImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Esmaltado Permanente",
        descripcion:
            "Color duradero, brillante y resistente por hasta 3 semanas.",
        imagen: manicureImg,
        link: "/agendar-hora",
    },
];

export default function ManicurePedicure() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Manicure y Pedicure"
                    subtitle="Cuidado profesional para resaltar la belleza natural de tus manos y pies"
                    buttonText="Agendar hora"
                    buttonLink="/agendar-hora"
                    backgroundImage={fondo}
                    gradient="rgba(0, 0, 0, 0.55)"
                    textGradient="linear-gradient(90deg, #ff8dcf, #b36bff)"
                />
            </div>

            <Container className="my-5">
                <Row className="text-center mb-4">
                    <h2 className="fw-bold text-secondary">Servicios Disponibles</h2>
                    <p className="text-muted">
                        Elige entre nuestros tratamientos especializados en manos y pies.
                    </p>
                </Row>

                <Row>
                    {servicios.map((srv, index) => (
                        <Col lg={4} md={6} sm={12} className="mb-4" key={index}>
                            <GlobalCard
                                image={srv.imagen}
                                title={srv.nombre}
                                description={srv.descripcion}
                                ctaText="Agendar hora"
                                ctaLink={srv.link}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
