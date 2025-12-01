// src/app/pages/cliente/servicios/Cosmetologia.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./cosmetologia.css";

import HeroBanner from "../../../../components/Hero/HeroBanner";
import GlobalCard from "../../../../components/Card/Global-Card/Global-Card";

import fondo from "../../../../assets/img/fondo/servicios/fondo_servicio.png";
import cosmetologiaImg from "../../../../assets/img/servicios/cosmetologia.jpg";

const servicios = [
    {
        nombre: "Limpieza Facial Profunda",
        descripcion:
            "Renueva y purifica tu piel con una limpieza profesional personalizada.",
        imagen: cosmetologiaImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Hidratación Facial Intensiva",
        descripcion:
            "Recupera la suavidad y luminosidad de tu piel con técnicas avanzadas.",
        imagen: cosmetologiaImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Tratamiento Anti-Edad",
        descripcion:
            "Técnicas enfocadas en atenuar líneas de expresión y mejorar la firmeza.",
        imagen: cosmetologiaImg,
        link: "/agendar-hora",
    },
];

export default function Cosmetologia() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Cosmetología"
                    subtitle="Tratamientos faciales profesionales para cuidar y rejuvenecer tu piel"
                    buttonText="Agendar hora"
                    buttonLink="/agendar-hora"
                    backgroundImage={fondo}
                    gradient="rgba(0, 0, 0, 0.55)"
                    textGradient="linear-gradient(90deg, #ff8dcf, #b36bff)"
                />
            </div>

            <Container className="my-5">
                <Row className="text-center mb-4">
                    <h2 className="fw-bold text-secondary">Tratamientos Disponibles</h2>
                    <p className="text-muted">
                        Elige uno de nuestros servicios especializados en cuidado facial.
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
