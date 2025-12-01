// src/app/pages/cliente/nosotros/nosotros.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./nosotros.css";

import HeroBanner from "../../../components/Hero/HeroBanner";

// Imágenes
import bastianImg from "../../../assets/img/fondo/nosotros/bastian.jpg";
import fondoNosotros from "../../../assets/img/fondo/nosotros/fondo_nosotros.png";
import dryImg from "../../../assets/img/fondo/nosotros/dry.jpg";
// const drhiaishnaInstagram = "https://instagram.com/drhiaishna"; // enlace opcional

const equipo = [
    {
        nombre: "Bastian Sanches",
        especialidad: "Frontend Developer",
        descripcion:
            "Soy un entusiasta de la programación con un interés particular en el desarrollo web y la experiencia de usuario. Me encanta resolver problemas complejos y aprender nuevas tecnologías.",
        foto: bastianImg,
        github: "https://github.com/Watoncitox",
    },
    // Aquí más adelante puedes ir sumando otros integrantes si quieres
];

const Nosotros = () => {
    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Conoce a Nuestro Equipo"
                    subtitle="Profesionales dedicados a realzar tu belleza y bienestar"
                    buttonText="Ver servicios"
                    backgroundImage={fondoNosotros}
                    gradient="rgba(0, 0, 0, 0.55)"
                    textGradient="linear-gradient(90deg, #ff8dcf, #b36bff)"
                />
            </div>

            {/* Nuestra historia */}
            <section className="container my-5 text-center">
                <h2 className="fw-bold mb-4 text-secondary">Nuestra Historia</h2>
                <p className="lead text-muted">
                    Style &amp; Beauty nace del deseo de ofrecer un espacio profesional,
                    cálido y respetuoso, donde cada persona pueda cuidar su imagen
                    sintiéndose cómoda, escuchada y acompañada en todo momento.
                </p>
            </section>

            {/* Sección destacada de Dry */}
            <section className="dry-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col md={5} className="text-center mb-4 mb-md-0">
                            <img
                                src={dryImg}
                                alt="Drhiaishna Martínez - Fundadora de Style & Beauty"
                                className="dry-photo"
                            />
                        </Col>
                        <Col md={7}>
                            <h2 className="dry-title mb-3">Dry, nuestra fundadora</h2>
                            <h3 className="dry-subtitle mb-3">
                                Esteticista profesional y corazón de Style &amp; Beauty
                            </h3>
                            <p className="dry-description">
                                Drhiaishna “Dry” Martínez es la mente y el corazón detrás de
                                Style &amp; Beauty. Su objetivo siempre ha sido entregar un
                                servicio de estética responsable, personalizado y con un trato
                                cercano, donde cada detalle esté pensado en el bienestar de
                                quienes visitan la clínica.
                            </p>
                            <ul className="dry-list">
                                <li>Formación en estética profesional y actualización constante.</li>
                                <li>
                                    Enfoque en resultados naturales, priorizando la salud de la
                                    piel y el cabello.
                                </li>
                                <li>
                                    Compromiso con un ambiente respetuoso, cálido y acogedor para
                                    cada paciente.
                                </li>
                            </ul>
                            <p className="dry-quote mt-3">
                                “Más que un tratamiento, quiero que vivas una experiencia en la
                                que te sientas valorada, cuidada y escuchada en cada visita.”
                            </p>
                            <div className="mt-3">
                                <Button
                                    variant="outline-primary"
                                    href= "https://www.instagram.com/_.style_and_beauty/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver Instagram
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="dry-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col md={7} className="mb-4 mb-md-0">
                            <h2 className="dry-title mb-3">Bastian Sanches</h2>
                            <h3 className="dry-subtitle mb-3">Frontend Developer</h3>
                            <p className="dry-description">
                                Es desarrollador apasionado por crear interfaces eficientes,
                                modernas y orientadas a la experiencia del usuario. Me especializo en React
                                y en la integración de herramientas que optimicen el rendimiento y la
                                usabilidad de esta aplicación.
                            </p>

                            {/*<p className="dry-description mt-3">*/}
                            {/*    Mis metas profesionales se enfocan en seguir creciendo como desarrollador*/}
                            {/*    frontend, ampliando mis conocimientos en arquitecturas modernas, diseño*/}
                            {/*    UI/UX y buenas prácticas de desarrollo. Aspiro a trabajar en proyectos que*/}
                            {/*    generen impacto real y me permitan continuar aprendiendo junto a equipos*/}
                            {/*    multidisciplinarios.*/}
                            {/*</p>*/}

                            <ul className="dry-list">
                                <li>Desarrollo de interfaces completas con React y Bootstrap.</li>
                                <li>Manejo de estados globales, contextos y optimización de componentes.</li>
                                <li>Experiencia en sistemas de autenticación y flujo de usuario.</li>
                                <li>Participación en proyectos reales aplicando metodologías ágiles.</li>
                            </ul>

                            <p className="dry-quote mt-3">
                                “Transformar datos en decisiones, ese es el verdadero propósito del desarrollo.”
                            </p>

                            <div className="mt-3">
                                <Button
                                    variant="outline-dark"
                                    href={equipo[0].github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver GitHub
                                </Button>
                            </div>
                        </Col>
                        <Col md={5} className="text-center">
                            <img src={bastianImg} alt={equipo[0].nombre} className="dry-photo" />
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    );
};

export default Nosotros;



