
import React, { useEffect, useState, useRef } from 'react';
import { Container, Card, ListGroup, Button, Alert, Form, Row, Col, Image, Modal } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './PerfilPage.css'; // 👈 Asegura que el CSS se importe
import { useAuth } from '../../../context/AuthContext';
import HeroBanner from '../../../components/Hero/HeroBanner';
import fondo from '../../../assets/img/fondo/servicios/fondo_servicio.png';

const PerfilPage = () => {
    const { usuario, notify, updateUsuario, logout } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ email: '', telefono: '', genero: '', avatar: '', rut: '' });
    const fileRef = useRef(null);
    const [showRutConfirm, setShowRutConfirm] = useState(false);

    useEffect(() => {
        if (!usuario) navigate('/inicio-sesion');
    }, [navigate, usuario]);

    const [showPwdModal, setShowPwdModal] = useState(false);
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [pwdError, setPwdError] = useState('');

    const handleChangePassword = () => {
        // open modal to change password
        setPwdError('');
        setCurrentPwd('');
        setNewPwd('');
        setConfirmPwd('');
        setShowPwdModal(true);
    };

    const handlePwdSave = () => {
        setPwdError('');
        const trimmedNew = (newPwd || '').trim();
        const trimmedConfirm = (confirmPwd || '').trim();

        if (!trimmedNew || !trimmedConfirm) {
            setPwdError('Debes ingresar la nueva contraseña y su confirmación.');
            return;
        }
        if (trimmedNew !== trimmedConfirm) {
            setPwdError('La nueva contraseña y su confirmación deben ser iguales.');
            return;
        }
        if (trimmedNew.length < 6) {
            setPwdError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // If usuario has an existing password, validate currentPwd
        if (usuario && usuario.password) {
            if ((currentPwd || '') !== usuario.password) {
                setPwdError('La contraseña actual no coincide.');
                return;
            }
        }

        // All good — persist
        const updated = { ...usuario, password: trimmedNew };
        updateUsuario(updated);
        notify({ title: 'Éxito', body: 'Contraseña actualizada correctamente', variant: 'success' });
        setShowPwdModal(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        if (usuario) {
            setForm({
                email: usuario.email || '',
                telefono: usuario.telefono || usuario.phone || '',
                genero: usuario.genero || '',
                avatar: usuario.avatar || usuario.photo || '',
                rut: usuario.rut || ''
            });
        }
    }, [usuario]);

    if (!usuario) {
        return <Alert variant="info" className="text-center mt-5">Cargando perfil...</Alert>;
    }

    const onFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setForm((s) => ({ ...s, avatar: ev.target.result }));
        };
        reader.readAsDataURL(f);
    };

    const handleSave = () => {
        // If rut is being added for the first time, ask for confirmation
        const rutTrim = (form.rut || '').trim();
        if ((!usuario.rut || usuario.rut === '') && rutTrim) {
            // ask confirm before saving immutable rut
            setShowRutConfirm(true);
            return;
        }

        const updated = { ...usuario };
        updated.email = form.email;
        updated.telefono = form.telefono;
        updated.genero = form.genero;
        updated.avatar = form.avatar;
        // do not overwrite existing rut
        if (!updated.rut) updated.rut = rutTrim || updated.rut;
        updateUsuario(updated);
        setEditing(false);
    };

    const confirmRutAndSave = () => {
        // user confirmed rut is correct; persist it
        const updated = { ...usuario };
        updated.email = form.email;
        updated.telefono = form.telefono;
        updated.genero = form.genero;
        updated.avatar = form.avatar;
        updated.rut = (form.rut || '').trim();
        updateUsuario(updated);
        setShowRutConfirm(false);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
        setForm({
            email: usuario.email || '',
            telefono: usuario.telefono || usuario.phone || '',
            genero: usuario.genero || '',
            avatar: usuario.avatar || usuario.photo || ''
        });
        if (fileRef.current) fileRef.current.value = null;
    };

    // Determina si es administrador (insensible a mayúsculas)
    const isAdmin = String(usuario.rol || '').toLowerCase() === 'admin';

    return (
        <>
            <div className="container-fluid py-5">
                <HeroBanner
                    title={`Hola, ${usuario.nombre || ''}`}
                    subtitle="Tu perfil y datos de contacto"
                    backgroundImage={fondo}
                    gradient="rgba(0,0,0,0.35)"
                    showButton={false}
                />
            </div>

            <Container className="my-5 perfil-container">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="perfil-card shadow-lg">
                            <Card.Header className="perfil-card-header-main">Detalles de tu Cuenta</Card.Header>
                            <Card.Body>
                                {!editing ? (
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            {form.avatar ? (
                                                <Image src={form.avatar} roundedCircle width={100} height={100} alt="Avatar" />
                                            ) : (
                                                <div style={{ width: 100, height: 100, borderRadius: 50, background: '#f0f0f0' }} />
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 className="mb-1">{usuario.nombre}</h4>
                                            <div className="small text-muted">{isAdmin ? 'Administrador' : 'Cliente'}</div>
                                            <ListGroup variant="flush" className="mt-3">
                                                <ListGroup.Item className="perfil-list-item"><strong>Email:</strong> {usuario.email}</ListGroup.Item>
                                                <ListGroup.Item className="perfil-list-item"><strong>Teléfono:</strong> {usuario.telefono || usuario.phone || '-'}</ListGroup.Item>
                                                <ListGroup.Item className="perfil-list-item"><strong>Género:</strong> {usuario.genero || '-'}</ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </div>
                                ) : (
                                    <Form>
                                        <Form.Group className="mb-3" controlId="rut">
                                            <Form.Label>RUT</Form.Label>
                                            {/* If usuario.rut exists, show read-only note */}
                                            {usuario.rut ? (
                                                <>
                                                    <Form.Control type="text" value={usuario.rut} readOnly />
                                                    <Form.Text className="text-muted">El RUT fue registrado y no puede modificarse desde la aplicación.</Form.Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Form.Control type="text" value={form.rut} onChange={(e) => setForm(s => ({ ...s, rut: e.target.value }))} placeholder="Ej: 12.345.678-9" />
                                                    <Form.Text className="text-muted">El RUT será inmutable una vez guardado (para cambiarlo, acude presencialmente a la clínica).</Form.Text>
                                                </>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="avatarUpload">
                                            <Form.Label>Imagen de perfil</Form.Label>
                                            <div className="d-flex align-items-center gap-3">
                                                {form.avatar ? (
                                                    <Image src={form.avatar} roundedCircle width={80} height={80} alt="Avatar" />
                                                ) : (
                                                    <div style={{ width: 80, height: 80, borderRadius: 40, background: '#f0f0f0' }} />
                                                )}
                                                <div>
                                                    <Form.Control type="file" accept="image/*" onChange={onFileChange} ref={fileRef} />
                                                    <Form.Text className="text-muted">JPG/PNG, máx 2MB (se almacenará en local en modo demo).</Form.Text>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="telefono">
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control type="tel" value={form.telefono} onChange={(e) => setForm(s => ({ ...s, telefono: e.target.value }))} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="genero">
                                            <Form.Label>Género</Form.Label>
                                            <Form.Select value={form.genero} onChange={(e) => setForm(s => ({ ...s, genero: e.target.value }))}>
                                                <option value="">No especificado</option>
                                                <option value="femenino">Femenino</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="otro">Otro</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Card.Body>
                            <Card.Footer className="text-center bg-white border-0 p-3">
                                {!editing ? (
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="primary" onClick={() => setEditing(true)}>Editar perfil</Button>
                                        <Button variant="outline-dark" onClick={handleChangePassword}>Cambiar Contraseña</Button>
                                        <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="success" onClick={handleSave}>Guardar</Button>
                                        <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                                    </div>
                                )}
                            </Card.Footer>
                        </Card>

                        {/* OPCIONES DE ADMINISTRADOR (CONDICIONAL) */}
                        {isAdmin && (
                            <Card className="perfil-card border-success shadow-lg mt-4"> 
                                <Card.Header className="admin-card-header">Panel de Administración</Card.Header>
                                <Card.Body>
                                    <h5 className="mb-3">Accesos Rápidos:</h5>
                                    <div className="admin-access-buttons">
                                        <Button as={NavLink} to="/admin/servicios" variant="success">Gestionar Servicios</Button>
                                        <Button as={NavLink} to="/admin/clientes" variant="info">Gestionar Clientes</Button>
                                        <Button as={NavLink} to="/admin/productos" variant="warning">Gestionar Productos</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
            {/* Confirmation modal for first-time RUT set */}
            <Modal show={showRutConfirm} onHide={() => setShowRutConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar RUT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que este es tu RUT? Una vez guardado no se podrá modificar desde la aplicación. Para cambiarlo deberás acudir presencialmente a la clínica.
                    <div className="mt-3"><strong>RUT a registrar:</strong> {form.rut}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRutConfirm(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmRutAndSave}>Sí, confirmar y guardar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de cambio de contraseña */}
            <Modal show={showPwdModal} onHide={() => setShowPwdModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pwdError && <Alert variant="danger">{pwdError}</Alert>}
                    {usuario && usuario.password ? (
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña actual</Form.Label>
                            <Form.Control type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
                        </Form.Group>
                    ) : (
                        <div className="small text-muted mb-2">No existe contraseña previa en este demo; ingresa la nueva contraseña directamente.</div>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmar nueva contraseña</Form.Label>
                        <Form.Control type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPwdModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handlePwdSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PerfilPage;