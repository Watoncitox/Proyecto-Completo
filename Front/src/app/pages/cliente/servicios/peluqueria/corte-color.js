// src/app/pages/cliente/servicios/CorteColor.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./corte-color.css";

import HeroBanner from "../../../../components/Hero/HeroBanner";
import GlobalCard from "../../../../components/Card/Global-Card/Global-Card";

import fondo from "../../../../assets/img/fondo/servicios/fondo_servicio.png";
import corteImg from "../../../../assets/img/servicios/corte.jpg";

const servicios = [
    {
        nombre: "Corte",
        descripcion:
            "Corte personalizado según tus facciones, estilo y tipo de cabello.",
        imagen: corteImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Coloración Completa",
        descripcion:
            "Color perfecto con productos de alta calidad para un acabado uniforme.",
        imagen: corteImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Mechas & Balayage",
        descripcion:
            "Técnicas modernas para aportar luz, movimiento y naturalidad a tu cabello.",
        imagen: corteImg,
        link: "/agendar-hora",
    },
];

export default function CorteColor() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Corte, Estilismo y Color"
                    subtitle="Transforma tu imagen con técnicas profesionales y modernas"
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
                        Elige uno de nuestros servicios para renovar tu estilo.
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
