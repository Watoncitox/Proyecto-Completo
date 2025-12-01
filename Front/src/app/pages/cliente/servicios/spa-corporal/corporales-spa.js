import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./corporales-spa.css";

import HeroBanner from "../../../../components/Hero/HeroBanner";
import GlobalCard from "../../../../components/Card/Global-Card/Global-Card";

import fondo from "../../../../assets/img/fondo/servicios/fondo_servicio.png";
import corporalesImg from "../../../../assets/img/servicios/corporales.jpg";

const servicios = [
    {
        nombre: "Masajes Descontracturantes",
        descripcion:
            "Alivia tensiones musculares y mejora tu bienestar físico y mental.",
        imagen: corporalesImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Masaje Relajación Premium",
        descripcion:
            "Técnica suave y profunda para reducir el estrés y renovar energías.",
        imagen: corporalesImg,
        link: "/agendar-hora",
    },
    {
        nombre: "Limpieza Corporal & Spa",
        descripcion:
            "Un tratamiento completo para exfoliar, hidratar y revitalizar tu cuerpo.",
        imagen: corporalesImg,
        link: "/agendar-hora",
    },
];

export default function CorporalesSpa() {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Tratamientos Corporales y Spa"
                    subtitle="Bienestar, equilibrio y renovación completa para tu cuerpo"
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
                        Selecciona uno de nuestros tratamientos corporales y disfruta una
                        experiencia de relajación profunda.
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
