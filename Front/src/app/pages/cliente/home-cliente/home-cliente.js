import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home-cliente.css";
import HeroBanner from "../../../components/Hero/HeroBanner";
// Importar componentes de Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

// Importa tus recursos multimedia
import dryImg from "../../../assets/img/fondo/dry/presentacion.jpg";
import iaImg from "../../../assets/img/fondo/nosotros/ia.png";
import fondoHome from "../../../assets/video/video.mp4";

function HomeCliente() {
  const navigate = useNavigate();

  // Función del botón "Agenda tu hora"
  const agendar = () => {
    navigate("/agendar-hora");
  };

  

  return (
    <div className="background-gradient">

      {/* ===== Hero principal ===== */}
    <div className="container-fluid py-5">
      <HeroBanner
        title="Bienvenida a Nuestra Clínica Estética"
        subtitle="Cuidamos tu belleza y bienestar"
        buttonText="Agenda tu Hora"
        onButtonClick={agendar}
        backgroundVideo={fondoHome}
        gradient="rgba(0, 0, 0, 0.55)"
      />
      {/* Aquí puedes seguir con secciones: servicios destacados, productos, etc. */}
    </div>

      {/* ===== Contenido Principal ===== */}
      <main>
        {/* Sobre Nosotros */}
        <section id="sobre-nosotros" className="about-section">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <img
                  src={iaImg}
                  alt="Drhiaishna Martínez Miranda"
                  className="about-img img-fluid rounded shadow"
                />
              </Col>
              <Col md={6}>
                <h2 className="mb-4">Sobre Nosotros</h2>
                <p className="lead">
                  En <strong>Stile & Beauty</strong> creemos que la belleza es el
                  reflejo del cuidado y la dedicación. Nuestro proyecto nace de la
                  unión entre <strong>Drhiaishna Martínez Miranda</strong> y nuestro
                  equipo de TI conformado por:{" "}
                  <strong>
                    Bastian Sanches Muñoz
                  </strong>.
                </p>
                <p>
                  Drhiaishna aporta la experiencia y pasión en el área de la
                  estética, mientras que nosotros, como Ingenieros en Informática,
                  respaldamos con apoyo tecnológico y estratégico en cada etapa de
                  este proyecto.
                </p>
                <p>
                  Nuestro sueño en conjunto es ofrecer un centro de estética integral
                  que combine profesionalismo, calidad y valores sólidos, donde cada
                  persona se sienta única, cuidada y valorada.
                </p>
                <div className="mt-4">
                  <Button 
                    as={Link} 
                    to="/nosotros" 
                    variant="primary" 
                    size="lg"
                    className="cta-btn"
                  >
                    Conócenos Más
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="custom-separator">
          <span className="separator-text">La ciencia de sentirse bien</span>
        </div>

        {/* Drhiaishna */}
        <section id="drhiaishna" className="about-section">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="order-md-2 text-center">
                <img
                  src={dryImg}
                  alt="Drhiaishna Martínez Miranda"
                  className="about-img img-fluid rounded shadow"
                />
              </Col>
              <Col md={6} className="order-md-1">
                <h2 className="mb-4">Drhiaishna Martínez Miranda</h2>
              <p>
                Drhiaishna es una profesional apasionada por la estética,
                actualmente egresada de la carrera de{" "}
                <strong>Estética Profesional en AIEP</strong>.
              </p>
              <p>
                Cuenta con formación especializada en{" "}
                <strong>tratamientos capilares</strong> (alisado permanente, botox
                capilar) y con más de un año de experiencia en la prestigiosa
                peluquería <em>“MARTIN C”</em> en Vitacura.
              </p>
                <p>En sus servicios particulares ofrece:</p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span className="text-primary me-2">✨</span>
                    <strong>Tratamientos capilares:</strong> alisados permanentes y
                    botox capilar.
                  </li>
                  <li className="mb-2">
                    <span className="text-primary me-2">✨</span>
                    <strong>Masoterapia:</strong> masajes descontracturantes,
                    relajantes, reductivos y post-operatorios.
                  </li>
                  <li className="mb-2">
                    <span className="text-primary me-2">✨</span>
                    <strong>Estilismo y color:</strong> cortes femeninos y
                    masculinos, tinturas completas, balayage y mechas.
                  </li>
                  <li className="mb-2">
                    <span className="text-primary me-2">✨</span>
                    <strong>Maquillaje profesional:</strong> para toda ocasión.
                  </li>
                  <li className="mb-2">
                    <span className="text-primary me-2">✨</span>
                    <strong>Manicure y pedicure:</strong> aplicación de Soft Gel y
                    acrílico.
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default HomeCliente;
