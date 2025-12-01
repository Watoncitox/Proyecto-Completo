import React, { useState } from "react";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Toast,
    ToastContainer,
} from "react-bootstrap";
import "./contacto.css";
import HeroBanner from "../../../components/Hero/HeroBanner";

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const [toastState, setToastState] = useState({
        show: false,
        success: true,
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.email || !formData.mensaje) {
            return setToastState({
                show: true,
                success: false,
                message: "Por favor completa todos los campos.",
            });
        }

        try {
            const mensajesPrevios =
                JSON.parse(localStorage.getItem("mensajes_contacto")) || [];

            mensajesPrevios.push({
                ...formData,
                fecha: new Date().toISOString(),
            });

            localStorage.setItem(
                "mensajes_contacto",
                JSON.stringify(mensajesPrevios)
            );

            setFormData({
                nombre: "",
                email: "",
                mensaje: "",
            });

            setToastState({
                show: true,
                success: true,
                message: "¡Mensaje enviado correctamente!",
            });
        } catch (error) {
            console.error(error);
            setToastState({
                show: true,
                success: false,
                message: "Error al enviar mensaje. Intenta nuevamente.",
            });
        }
    };

    return (
        <>
            {/* HEADER PRINCIPAL - usar HeroBanner para mantener tamaño/forma igual a Servicios/Home */}
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Contáctanos"
                    subtitle="Estamos aquí para ayudarte. Cuéntanos tus dudas o comentarios."
                    gradient="rgba(0, 0, 0, 0.5)"
                />
            </div>

            {/* CONTENIDO */}
            <Container className="mt-5 mb-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white contacto-form">
                            <Form.Group className="mb-3">
                                <Form.Label className="contacto-label">Nombre completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="contacto-label">Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="contacto-label">Mensaje</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Escribe tu mensaje..."
                                    className="no-resize"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="dark" type="submit" className="px-4 contacto-btn">
                                    Enviar mensaje
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

            {/* TOAST */}
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    bg={toastState.success ? "success" : "danger"}
                    onClose={() => setToastState({ ...toastState, show: false })}
                    show={toastState.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Body className="text-white">{toastState.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default Contacto;
