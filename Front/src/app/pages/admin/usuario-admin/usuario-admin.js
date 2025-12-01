import React, { useState } from 'react';
import { Container, Button, Card, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CardUsuario from '../../../components/Card/Card-Usuario/Card-Usuario';
import './usuario-admin.css';
import { useAuth } from '../../../context/AuthContext';
import HeroBanner from '../../../components/Hero/HeroBanner';

export default function UsuarioAdmin() {
  const { usuario, updateUsuario, logout, notify } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const handleSave = (updated) => {
    updateUsuario(updated);
    notify({ title: 'Guardado', body: 'Datos guardados correctamente', variant: 'success' });
  };

  const handleLogout = () => {
    logout();
    navigate('/inicio-sesion');
  };

  return (
    <>
      <div className="page-hero admin-hero container-fluid py-5">
        <HeroBanner
          title="Mi cuenta"
          subtitle="Administración de tu perfil y opciones de administrador"
          gradient="rgba(0,0,0,0.45)"
          showButton={false}
        />
      </div>

      <Container className="mt-4 pt-4 usuario-admin-page">

        {!usuario ? (
          <p className="text-muted">No se encontró información del usuario. Por favor inicia sesión.</p>
        ) : (
          <>
            {!editing ? (
              <Card className="p-3 shadow-sm usuario-admin-card">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md="auto">
                      {usuario.avatar ? (
                        <Image src={usuario.avatar} roundedCircle width={100} height={100} alt="Avatar" />
                      ) : (
                        <div style={{ width: 100, height: 100, borderRadius: 50, background: '#f0f0f0' }} />
                      )}
                    </Col>
                    <Col>
                      <h4 className="mb-1">{usuario.nombre}</h4>
                      <div className="small text-muted">Administrador</div>
                      <ListGroup variant="flush" className="mt-3">
                        <ListGroup.Item><strong>Correo:</strong> {usuario.email || '-'}</ListGroup.Item>
                        <ListGroup.Item><strong>Teléfono:</strong> {usuario.telefono || usuario.phone || '-'}</ListGroup.Item>
                        <ListGroup.Item><strong>RUT:</strong> {usuario.rut || '-'}</ListGroup.Item>
                        <ListGroup.Item><strong>Estado:</strong> {usuario.estado || '-'}</ListGroup.Item>
                        <ListGroup.Item><strong>Especialidad:</strong> {usuario.especialidad || '-'}</ListGroup.Item>
                        <ListGroup.Item><strong>Experiencia:</strong> {usuario.experiencia || '-'}</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-center bg-white border-0 p-3">
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="primary" onClick={() => setEditing(true)}>Editar perfil</Button>
                    <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
                  </div>
                </Card.Footer>
              </Card>
            ) : (
              <CardUsuario usuario={usuario} onSave={(updated) => { handleSave(updated); setEditing(false); }} />
            )}
          </>
        )}
      </Container>
    </>
  );
}
