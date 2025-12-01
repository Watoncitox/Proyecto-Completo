// src/app/pages/cliente/servicios/Capilares.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./capilares.css";

import HeroBanner from "../../../../components/Hero/HeroBanner";
import GlobalCard from "../../../../components/Card/Global-Card/Global-Card";

import fondo from "../../../../assets/img/fondo/servicios/fondo_servicio.png";
import capilaresImg from "../../../../assets/img/servicios/capilares.jpg";

const servicios = [
    {
        nombre: "Botox Capilar",
        descripcion:
            "Tratamiento intensivo que reconstruye, hidrata y brinda brillo profundo.",
        imagen: capilaresImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Keratina Profesional",
        descripcion:
            "Alisado de larga duración para un cabello suave, brillante y sin frizz.",
        imagen: capilaresImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Shock de Hidratación",
        descripcion:
            "Reparación instantánea para cabellos secos, dañados o quebradizos.",
        imagen: capilaresImg,
        link: "/agendar-hora",
    },
];

export default function Capilares() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Tratamientos Capilares"
                    subtitle="Repara, hidrata y transforma tu cabello con técnicas profesionales"
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
                        Elige uno de nuestros tratamientos especializados para tu cabello.
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
