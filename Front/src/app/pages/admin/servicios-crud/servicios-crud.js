import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Alert, Form, Modal } from 'react-bootstrap';
import HeroBanner from '../../../components/Hero/HeroBanner';
import { servicesService } from '../../../../services/servicesService';
// NavbarAdmin is provided globally by App.js when the user is admin.
import './servicios-crud.css';
// Nota: Asume que las clases de Bootstrap ya están disponibles en tu proyecto.


const ServiciosCRUD = () => {
    // Estado para la lista de servicios (editable)
    const [services, setServices] = useState([]);
    useEffect(() => {
        setServices(servicesService.getServices());
        const off = servicesService.onChange((list) => setServices(list));
        return off;
    }, []);
    // Estado para mostrar mensajes al administrador
    const [message, setMessage] = useState(null);
    // Modal para crear/editar servicio
    const [showModal, setShowModal] = useState(false);
    const [creatingService, setCreatingService] = useState({
        name: '',
        price: 0,
        duration: 60,
        active: true,
        category: 'cosmetologia'
    });
    const [editingId, setEditingId] = useState(null); // null = creating, otherwise editing existing

    // Price and active state are editable only via the modal form now.
    // Inline table editing handlers removed to prevent direct edits from the list.

    /**
     * Simula el guardado de los cambios a la base de datos.
     */
    const handleSaveChanges = () => {
        try {
            servicesService.saveServices(services);
            setMessage({ type: 'success', text: '¡Cambios guardados exitosamente en el sistema!' });
            setTimeout(() => setMessage(null), 4000);
        } catch (e) {
            setMessage({ type: 'danger', text: 'Error al guardar los cambios.' });
        }
    };
    
    // --- Funciones de Gestión (Simulación de CRUD de ejemplo) ---
    // NOTA: Estas funciones son placeholders. Implementa la lógica real de modal/formulario aquí.

    const handleNew = () => {
        // open modal to create a full service
        setCreatingService({ name: '', price: 0, duration: 60, active: true, category: 'cosmetologia' });
        setEditingId(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCreateSubmit = () => {
        // basic validation
        if (!creatingService.name || creatingService.name.trim() === '') {
            setMessage({ type: 'danger', text: 'El nombre del servicio es obligatorio.' });
            return;
        }
        if (isNaN(Number(creatingService.price)) || Number(creatingService.price) < 0) {
            setMessage({ type: 'danger', text: 'Precio inválido.' });
            return;
        }
        if (!creatingService.category) {
            setMessage({ type: 'danger', text: 'Selecciona una categoría.' });
            return;
        }

        if (editingId) {
            // update existing
            const patch = {
                category: creatingService.category,
                name: creatingService.name,
                price: Number(creatingService.price),
                duration: Number(creatingService.duration),
                active: !!creatingService.active
            };
            servicesService.updateService(editingId, patch);
            setShowModal(false);
            setMessage({ type: 'success', text: 'Servicio actualizado correctamente.' });
            setTimeout(() => setMessage(null), 3000);
            setEditingId(null);
            return;
        }

        const id = `${creatingService.category}-${Date.now()}`;
        const nuevo = {
            id,
            category: creatingService.category,
            name: creatingService.name,
            price: Number(creatingService.price),
            duration: Number(creatingService.duration),
            active: !!creatingService.active
        };

        servicesService.createService(nuevo);
        setShowModal(false);
        setMessage({ type: 'success', text: 'Servicio creado correctamente.' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleEdit = (service) => {
        setCreatingService({
            name: service.name,
            price: service.price,
            duration: service.duration,
            active: !!service.active,
            category: service.category
        });
        setEditingId(service.id);
        setShowModal(true);
    };

    const handleDeleteFromModal = (id) => {
        if (!id) return;
        if (window.confirm(`¿Eliminar servicio ${id}? Esta acción es irreversible.`)) {
            servicesService.deleteService(id);
            setShowModal(false);
            setMessage({ type: 'warning', text: `Servicio ID ${id} eliminado.` });
            setTimeout(() => setMessage(null), 3000);
        }
    };
    // ------------------------------------------------------------------

    return (
        <>
            <div className="page-hero admin-hero container-fluid py-5">
                <HeroBanner title="Gestion Servicios" subtitle="Administra el catálogo de servicios" gradient="rgba(0,0,0,0.45)" showButton={false} />
            </div>

            <Container className="my-4 pt-4">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold text-dark">Gestión de Servicios 💅</h1>
                    <Button variant="success" onClick={handleNew}>
                        + Añadir Servicio
                    </Button>
                </header>

            {/* Muestra mensajes de estado */}
            {message && <Alert variant={message.type} className="text-center">{message.text}</Alert>}

            <div className="shadow-lg rounded bg-white p-4">
                <Table striped bordered hover responsive className="text-center align-middle">
                    <thead>
                        <tr className="bg-light">
                            <th>ID</th>
                            <th>Servicio</th>
                            <th style={{ width: '150px' }}>Precio ($)</th>
                            {/* <th style={{ width: '100px' }}>Stock</th> */}
                            <th>Duración</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td className="text-start fw-medium">{service.name}</td>
                                
                                {/* Precio (editable sólo en modal) */}
                                <td className="text-center">{service.price}</td>
                                
                                
                                <td>{service.duration}</td>
                                
                                <td>
                                    <span className={`badge ${service.active ? 'bg-success' : 'bg-danger'}`}>
                                        {service.active ? 'Disponible' : 'Desactivado'}
                                    </span>
                                </td>
                                
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(service)}>
                                            Editar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
            <div className="mt-4 text-end">
                <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={handleSaveChanges}
                    disabled={!!message && message.type === 'danger'} // Deshabilita si hay errores
                >
                    Guardar Cambios
                </Button>
            </div>

            {/* Modal para crear nuevo servicio */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? 'Editar servicio' : 'Crear nuevo servicio'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del servicio</Form.Label>
                            <Form.Control type="text" value={creatingService.name} onChange={(e) => setCreatingService(s => ({ ...s, name: e.target.value }))} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select value={creatingService.category} onChange={(e) => setCreatingService(s => ({ ...s, category: e.target.value }))}>
                                <option value="cosmetologia">Cosmetología</option>
                                <option value="corporales">Tratamientos Corporales y Spa</option>
                                <option value="manicure">Manicure y Pedicure</option>
                                <option value="corte-y-color">Corte, Estilismo y Color</option>
                                <option value="maquillaje">Maquillaje Profesional</option>
                                <option value="capilares">Tratamientos Capilares</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio (CLP)</Form.Label>
                            <Form.Control type="number" value={creatingService.price} onChange={(e) => setCreatingService(s => ({ ...s, price: e.target.value }))} />
                        </Form.Group>


                        
                        <Form.Group className="mb-3">
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Control type="number" value={creatingService.duration} onChange={(e) => setCreatingService(s => ({ ...s, duration: e.target.value }))} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Activo (visible en cliente)" checked={creatingService.active} onChange={(e) => setCreatingService(s => ({ ...s, active: e.target.checked }))} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                    <div className="ms-auto d-flex gap-2">
                        <Button variant="primary" onClick={handleCreateSubmit}>{editingId ? 'Guardar cambios' : 'Crear servicio'}</Button>
                        {editingId && (
                            <Button variant="danger" onClick={() => handleDeleteFromModal(editingId)}>Eliminar servicio</Button>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>

            {services.length === 0 && (
                <div className="alert alert-info mt-4 text-center">
                    No hay servicios registrados. ¡Crea el primero!
                </div>
            )}
        </Container>
        </>
    );
};

export default ServiciosCRUD;