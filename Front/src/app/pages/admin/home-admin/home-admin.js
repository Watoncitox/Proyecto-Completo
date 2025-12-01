import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// NavbarAdmin is provided globally by App.js when the user is admin.
import "./home-admin.css";
import HeroBanner from "../../../components/Hero/HeroBanner";

import { listCitas } from "../../../../services/appointmentsService";
import servicesService from "../../../../services/servicesService";

// Imágenes desde assets
import fondoServicio from "../../../assets/img/fondo/servicios/fondo_servicio.png";
import clientesImg from "../../../assets/img/fondo/servicios/clientes.png";
// usuarioIcon removed (not used) to avoid lint warning

const HomeAdmin = () => {
  const cards = [
    {
      title: "Servicios",
      text: "Agrega, edita o elimina los servicios ofrecidos en la clínica.",
      image: fondoServicio,
      link: "/admin/servicios-crud",
      button: "Gestionar Servicios",
    },
    {
      title: "Productos",
      text: "Gestiona el catálogo de productos disponibles en la clínica.",
      image: clientesImg,
      link: "/admin/productos",
      button: "Ver Productos",
    },
    {
      title: "Mi agenda",
      text: "Revisa y administra tus citas programadas.",
      image: fondoServicio,
      link: "/admin/agenda",
      button: "Ver Agenda",
    },
    {
      title: "Mi usuario",
      text: "Configura los datos de tu cuenta de administrador.",
      image: clientesImg,
      link: "/admin/usuario",
      button: "Configurar usuario",
    },
    {
      title: "Clientes",
      text: "Consulta la lista completa de clientes y su información.",
      image: clientesImg,
      link: "/admin/clientes",
      button: "Ver Clientes",
    },
    // Descomenta si deseas incluir la opción RRSS o usuario
    // {
    //   title: "RRSS",
    //   text: "Edita la información de tu cuenta de administrador.",
    //   image: usuarioIcon,
    //   link: "/usuario",
    //   button: "Configurar Perfil",
    // },
  ];

  return (
    <>
      <main className="home-admin-background min-vh-100 d-flex flex-column align-items-center justify-content-start">
        <div className="page-hero admin-hero container-fluid py-5">
          <HeroBanner
            title="Panel de Administración"
            subtitle="Gestiona tu clínica estética desde un solo lugar"
            backgroundImage={fondoServicio}
            gradient="rgba(0,0,0,0.45)"
            showButton={false}
          />
        </div>

        <Container>
          {/* Summary card for today */}
          <Row className="mb-4 justify-content-center">
            <Col md={10} data-aos="fade-up">
              <TodaySummaryCard />
            </Col>
          </Row>

          <Row className="g-4 justify-content-center">
            {cards.map((card, idx) => (
              <Col key={idx} md={4} sm={6} data-aos="fade-up">
                <Card className="admin-card h-100 text-center border-0">
                  <Card.Img
                    variant="top"
                    src={card.image}
                    className="admin-card-img"
                  />
                  <Card.Body>
                    <Card.Title className="text-danger fw-bold fs-4 mb-2">
                      {card.title}
                    </Card.Title>
                    <Card.Text className="text-secondary mb-4">
                      {card.text}
                    </Card.Text>
                    <NavLink to={card.link}>
                      <Button
                        variant="outline-danger"
                        className="rounded-pill px-4 fw-semibold"
                      >
                        {card.button}
                      </Button>
                    </NavLink>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {/* Motivation bar at the bottom */}
        <div className="admin-motivation-bar">
          <div className="text">"Cada día es una nueva oportunidad para embellecer sonrisas."</div>
        </div>
      </main>
    </>
  );
};
export default HomeAdmin;

/* --- Today summary component --- */
function TodaySummaryCard() {
  const [citasHoy, setCitasHoy] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    try {
      const all = listCitas();
      const today = new Date();
      const hoy = all.filter(c => new Date(c.fechaHora).toDateString() === today.toDateString());
      setCitasHoy(hoy);
    } catch (e) {
      setCitasHoy([]);
    }

    try {
      const sv = servicesService && servicesService.getServices ? servicesService.getServices() : [];
      setServices(sv);
    } catch (e) {
      setServices([]);
    }
  }, []);

  // working day: 09:00 - 18:00 => 9 hours = 540 minutes
  const workingMinutes = 9 * 60;

  const takenMinutes = citasHoy.reduce((sum, c) => {
    const svc = services.find(s => s.name === (c.servicio || c.service || ''));
    const dur = svc ? Number(svc.duration || svc.durationMinutes || 60) : 60;
    return sum + (isNaN(dur) ? 60 : dur);
  }, 0);

  const freeMinutes = Math.max(0, workingMinutes - takenMinutes);

  const fmt = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="mb-1">Hoy: {new Date().toLocaleDateString('es-CL')}</h5>
        <div className="d-flex gap-4 align-items-center mt-2">
          <div>
            <div className="small text-muted">Horas tomadas</div>
            <div className="fw-bold">{fmt(takenMinutes)}</div>
          </div>
          <div>
            <div className="small text-muted">Horas libres</div>
            <div className="fw-bold">{fmt(freeMinutes)}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="small text-muted">Reservas para hoy</div>
            {citasHoy.length === 0 ? (
              <div className="text-muted">No hay citas programadas para hoy.</div>
            ) : (
              <ListGroup variant="flush">
                {citasHoy.slice(0,5).map(c => (
                  <ListGroup.Item key={c.id} className="d-flex justify-content-between align-items-center py-1">
                    <div>
                      <div className="fw-medium">{c.servicio}</div>
                      <div className="small text-muted">{c.cliente}</div>
                    </div>
                    <div className="small text-muted">{new Date(c.fechaHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </ListGroup.Item>
                ))}
                {citasHoy.length > 5 && <ListGroup.Item className="small text-muted">...y {citasHoy.length - 5} más</ListGroup.Item>}
              </ListGroup>
            )}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0 d-flex justify-content-end">
        <NavLink to="/admin/agenda">
          <Button variant="outline-primary">Ir a Agenda</Button>
        </NavLink>
      </Card.Footer>
    </Card>
  );
}
