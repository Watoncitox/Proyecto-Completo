import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Alert,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { servicesService } from "../../../../services/servicesService";
import "react-calendar/dist/Calendar.css";
import "./agendar-hora.css";

import HeroBanner from "../../../components/Hero/HeroBanner";
import fondo from "../../../assets/img/fondo/servicios/fondo_servicio.png";


// Simulación: duración de cada servicio
const DURACIONES = {
    "limpieza-facial": 60,
    "descontracturante": 50,
    "manicure-spa": 45,
    "corte-profesional": 40,
    "maquillaje-social": 60,
    "botox-capilar": 90,
};

// Simulación: horas tomadas desde backend
const HORAS_OCUPADAS_MOCK = {
    "2025-01-15": ["10:00", "12:00"],
    "2025-01-20": ["09:00", "11:00", "13:00"],
};

// Categorías y labels (igual que en la página principal de servicios)
const CATEGORIAS = [
    { key: 'cosmetologia', label: 'Cosmetología' },
    { key: 'corporales', label: 'Tratamientos Corporales y Spa' },
    { key: 'manicure', label: 'Manicure y Pedicure' },
    { key: 'corte-y-color', label: 'Corte, Estilismo y Color' },
    { key: 'maquillaje', label: 'Maquillaje Profesional' },
    { key: 'capilares', label: 'Tratamientos Capilares' },
];

export default function AgendarHora() {
    const [servicio, setServicio] = useState("");
    const [fecha, setFecha] = useState(new Date());
    const [horas, setHoras] = useState([]);
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [ocupadas, setOcupadas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState('all');

    const [modalLogin, setModalLogin] = useState(false);
    const [confirmacion, setConfirmacion] = useState(null);
    const [allServices, setAllServices] = useState([]);
    const [selectedServiceObj, setSelectedServiceObj] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = useAuth();
    const { cart, addToCart } = useCart();

    // use the stable top-level list

    // Capturar servicio desde URL o seleccionar el primero por defecto
    useEffect(() => {
        const p = new URLSearchParams(location.search);
        const srv = p.get("servicio");
        // fallback to first admin-provided service id or to DURACIONES map
        const servicesList = servicesService.getServices() || [];
        const initial = srv || (servicesList[0] && servicesList[0].id) || Object.keys(DURACIONES)[0];
        setServicio(initial);
        const dur = (servicesList.find(s => s.id === initial)?.duration) || DURACIONES[initial] || 30;
        generarSlots(Number(dur));
    }, [location]);

    // Load services from admin-managed store
    useEffect(() => {
        setAllServices(servicesService.getServices());
        const off = servicesService.onChange((list) => setAllServices(list));
        return off;
    }, []);

    // Genera bloques de horarios
    const generarSlots = (duracion) => {
        const inicio = 9 * 60;
        const fin = 19 * 60;
        const slots = [];

        for (let m = inicio; m + duracion <= fin; m += duracion) {
            const h = String(Math.floor(m / 60)).padStart(2, "0");
            const min = String(m % 60).padStart(2, "0");
            slots.push(`${h}:${min}`);
        }

        setHoras(slots);
    };

    // Máxima fecha seleccionable: hoy + 30 días
    const maxDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        return d;
    })();

    const isSameDay = (d1, d2) => d1.toISOString().split('T')[0] === d2.toISOString().split('T')[0];

    const getThresholdMinutesForToday = () => {
        const now = new Date();
        now.setHours(now.getHours() + 5);
        return now.getHours() * 60 + now.getMinutes();
    };

    // Cargar horas ocupadas simuladas
    useEffect(() => {
        const f = fecha.toISOString().split("T")[0];
        setOcupadas(HORAS_OCUPADAS_MOCK[f] || []);
    }, [fecha]);

    // Horas disponibles filtradas (no ocupadas)
    const horasDisponibles = (() => {
        const today = new Date();
        const isToday = isSameDay(fecha, today);
        const threshold = getThresholdMinutesForToday();

        return horas.filter((h) => {
            if (ocupadas.includes(h)) return false;
            if (!isToday) return true;
            // si es hoy, permitir solo horarios >= now + 5h
            const [hh, mm] = h.split(":").map(Number);
            const minutes = hh * 60 + mm;
            return minutes >= threshold;
        });
    })();

    const serviciosPorCategoria = CATEGORIAS.reduce((acc, cat) => {
        acc[cat.key] = allServices.filter((s) => s.category === cat.key && s.active);
        return acc;
    }, {});

    const filteredServiciosPorCategoria = Object.keys(serviciosPorCategoria).reduce((acc, key) => {
        let list = (serviciosPorCategoria[key] || []);
        if (categoryFilter !== 'all') {
            list = list.filter(s => s.category === categoryFilter);
        }
        acc[key] = list;
        return acc;
    }, {});

    const searchResults = (searchTerm || '').trim() === '' ? [] : allServices.filter(s =>
        s.active &&
        s.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
        (categoryFilter === 'all' || s.category === categoryFilter)
    );

    // Intento de reserva
    const reservar = () => {
        if (!usuario) {
            setModalLogin(true);
            return;
        }

        // Validaciones: hora seleccionada
        if (!horaSeleccionada) {
            setConfirmacion({ tipo: "error", mensaje: "Debes seleccionar una hora antes de confirmar." });
            return;
        }

        const fechaStr = fecha.toISOString().split("T")[0];

        // Si la fecha es hoy, validar que la hora seleccionada esté al menos 5 horas por delante
        if (isSameDay(fecha, new Date())) {
            const [sh, sm] = horaSeleccionada.split(":").map(Number);
            const minutosSeleccion = sh * 60 + sm;
            const threshold = getThresholdMinutesForToday();
            if (minutosSeleccion < threshold) {
                setConfirmacion({ tipo: "error", mensaje: "No puedes reservar para hoy a menos que el horario esté al menos 5 horas por delante del momento actual." });
                return;
            }
        }

        // Contar servicios distintos ya en el carrito (solo items de tipo 'booking')
        const serviciosEnCarrito = new Set(
            (cart || [])
                .filter((it) => it && it.type === "booking")
                .map((it) => it.serviceKey)
        );

        // No permitir agendar el mismo servicio más de una vez
        if (serviciosEnCarrito.has(servicio)) {
            setConfirmacion({ tipo: "error", mensaje: "No puedes agendar el mismo servicio más de una vez." });
            return;
        }

        // Límite de 5 servicios distintos
        if (serviciosEnCarrito.size >= 5) {
            setConfirmacion({ tipo: "error", mensaje: "Has alcanzado el máximo de 5 servicios distintos. Elimina alguno del carrito para añadir otro." });
            return;
        }

        // Crear item de depósito y añadir al carrito
        const servicioInfo = selectedServiceObj || allServices.find((s) => s.id === servicio) || { name: servicio };
        const bookingItem = {
            id: `booking-${servicio}-${fechaStr}-${horaSeleccionada}`,
            type: "booking",
            serviceKey: servicio,
            name: `${servicioInfo.name} (Seña $10.000)`,
            date: fechaStr,
            time: horaSeleccionada,
            price: 10000,
            currency: "CLP",
            quantity: 1,
        };

        addToCart(bookingItem);

        setConfirmacion({ tipo: "success", mensaje: "Depósito agregado al carrito por $10.000. Completa la compra para finalizar la reserva." });
    };

    return (
        <>
            {/* HERO SUPERIOR (usar mismo contenedor que Home/Contacto para dimensiones iguales) */}
            <div className="container-fluid py-5">
                <HeroBanner
                    title="Agendar Hora"
                    subtitle="Selecciona tu fecha y horario disponible"
                    backgroundImage={fondo}
                    gradient="rgba(0,0,0,0.55)"
                    textGradient="linear-gradient(90deg, #ff8dcf, #b36bff)"
                />
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <Container className="agenda-wrapper">
                <Row className="justify-content-center">
                    <Col lg={10} className="agenda-card shadow-lg">

                        <h2 className="agenda-title">
                            Reserva – {servicio.replace("-", " ")}
                        </h2>

                        {confirmacion && (
                            <Alert variant={confirmacion.tipo === 'success' ? 'success' : 'danger'} className="text-center">
                                {confirmacion.mensaje}
                            </Alert>
                        )}

                        {/* CALENDARIO */}
                        <Row>
                            <Col md={6} className="calendar-section">
                                <Alert variant="info" className="mb-3">
                                    Para reservar debes abonar <strong>$10.000</strong>; este monto será descontado del valor final del servicio. Si deseas cancelar la cita, envía un mensaje al contacto con al menos <strong>72 horas</strong> de anticipación.
                                </Alert>
                                <h5 className="section-title">Selecciona un día</h5>
                                <Calendar
                                    onChange={setFecha}
                                    value={fecha}
                                    minDate={new Date()}
                                    maxDate={maxDate}
                                    className="calendar-custom"
                                />

                                <h5 className="section-title mt-3">Horas disponibles</h5>
                                {isSameDay(fecha, new Date()) && (
                                    <div className="small text-muted mb-2">Nota: Para reservas el mismo día, sólo se permiten horarios que estén al menos <strong>5 horas</strong> por delante del horario actual.</div>
                                )}
                                <Row>
                                    {horasDisponibles.length === 0 ? (
                                        <p className="text-muted">No hay horarios disponibles para este día.</p>
                                    ) : (
                                        horasDisponibles.map((h, i) => (
                                            <Col xs={6} md={4} className="mb-3" key={i}>
                                                <Button
                                                    onClick={() => setHoraSeleccionada(h)}
                                                    className={`hora-slot ${
                                                        horaSeleccionada === h ? "slot-active" : ""
                                                    }`}
                                                >
                                                    {h}
                                                </Button>
                                            </Col>
                                        ))
                                    )}
                                </Row>
                            </Col>

                            <Col md={6} className="servicios-menu">
                                <h5 className="section-title">Servicios</h5>
                                            <div className="mb-3 d-flex align-items-center">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    placeholder="Buscar servicio..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <select className="form-select w-auto" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                                    <option value="all">Todas las categorías</option>
                                                    {CATEGORIAS.map(c => (
                                                        <option key={c.key} value={c.key}>{c.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="list-group list-scroll">
                                                {searchTerm.trim() !== '' ? (
                                                    // Show only matching services as a flat list
                                                    searchResults.length === 0 ? (
                                                        <div className="small text-muted">No se encontraron servicios.</div>
                                                    ) : (
                                                        searchResults.map(s => (
                                                            <div key={s.id} className="mb-2 d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <strong>{s.name}</strong>
                                                                    <div className="small text-muted">Duración: {s.duration} min — ${Number(s.price).toLocaleString('es-CL')} CLP</div>
                                                                </div>
                                                                <div>
                                                                    <Button
                                                                        size="sm"
                                                                        variant={servicio === s.id ? 'primary' : 'outline-primary'}
                                                                        onClick={() => {
                                                                            setServicio(s.id);
                                                                            setSelectedServiceObj(s);
                                                                            generarSlots(Number(s.duration) || DURACIONES['limpieza-facial']);
                                                                            setHoraSeleccionada("");
                                                                        }}
                                                                    >
                                                                        {servicio === s.id ? 'Seleccionado' : 'Seleccionar'}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                ) : (
                                                    // No search: show categories that have services
                                                    CATEGORIAS.map((cat) => {
                                                        const list = (filteredServiciosPorCategoria[cat.key] || []);
                                                        if (list.length === 0) return null;
                                                        return (
                                                            <div key={cat.key} className="mb-3">
                                                                <h6 className="mb-2">{cat.label}</h6>
                                                                {list.map((s) => (
                                                                    <div key={s.id} className="mb-2 d-flex align-items-center justify-content-between">
                                                                        <div>
                                                                            <strong>{s.name}</strong>
                                                                            <div className="small text-muted">Duración: {s.duration} min — ${Number(s.price).toLocaleString('es-CL')} CLP</div>
                                                                        </div>
                                                                        <div>
                                                                            <Button
                                                                                size="sm"
                                                                                variant={servicio === s.id ? 'primary' : 'outline-primary'}
                                                                                onClick={() => {
                                                                                    setServicio(s.id);
                                                                                    setSelectedServiceObj(s);
                                                                                    generarSlots(Number(s.duration) || DURACIONES['limpieza-facial']);
                                                                                    setHoraSeleccionada("");
                                                                                }}
                                                                            >
                                                                                {servicio === s.id ? 'Seleccionado' : 'Seleccionar'}
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                            </Col>
                        </Row>

                        {/* BOTÓN RESERVAR */}
                        <div className="text-center mt-4">
                            <Button
                                disabled={!horaSeleccionada}
                                className="btn-reservar"
                                onClick={reservar}
                            >
                                Confirmar reserva
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* MODAL LOGIN */}
            <Modal show={modalLogin} onHide={() => setModalLogin(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Debes iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Para agendar una hora debes iniciar sesión con tu cuenta.
                    Esto nos permite enviarte confirmaciones y recordatorios.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalLogin(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setModalLogin(false);
                            navigate("/inicio-sesion");
                        }}
                    >
                        Iniciar sesión
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
