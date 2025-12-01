// src/app/pages/cliente/servicios/Maquillaje.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./maquillaje.css";

import HeroBanner from "../../../../components/Hero/HeroBanner";
import GlobalCard from "../../../../components/Card/Global-Card/Global-Card";

import fondo from "../../../../assets/img/fondo/servicios/fondo_servicio.png";
import maquillajeImg from "../../../../assets/img/servicios/maquillaje.jpg";

const servicios = [
    {
        nombre: "Maquillaje Social",
        descripcion:
            "Maquillaje profesional para eventos, celebraciones y ocasiones especiales.",
        imagen: maquillajeImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Maquillaje Día/Noche",
        descripcion:
            "Looks personalizados según tu estilo, vestimenta y ocasión.",
        imagen: maquillajeImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Maquillaje para Sesiones",
        descripcion:
            "Ideal para sesiones fotográficas, branding, moda y contenido profesional.",
        imagen: maquillajeImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Maquillaje de Novia",
        descripcion:
            "Produccion completa para el día más especial de tu vida",
        imagen: maquillajeImg,
        link: "/agendar-hora",
    },
];

export default function Maquillaje() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Maquillaje Profesional"
                    subtitle="Resalta tu belleza en cada ocasión con técnicas expertas"
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
                        Elige uno de nuestros servicios de maquillaje profesional.
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
