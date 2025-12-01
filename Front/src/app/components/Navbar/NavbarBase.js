import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/img/logo/logo.jpg";
import "./Navbar.css";

export default function NavbarBase({ links, brandColor = "danger" }) {
  return (
    <div className="floating-menu-container">
      <Navbar expand="lg" className="app-navbar shadow-sm rounded-pill px-4 py-2 bg-white" style={{ maxWidth: "1200px" }}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center text-decoration-none">
            <img src={logo} alt="Logo" className="logo rounded-3 me-2" />
            <span className={`fw-bold text-${brandColor}`}>Stile & Beauty</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {links.map(({ to, label }) => (
                <Nav.Link key={to} as={NavLink} to={to} className="fw-semibold">
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
