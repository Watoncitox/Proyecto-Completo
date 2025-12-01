import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import "./inicio-sesion.css";
import HeroBanner from "../../components/Hero/HeroBanner";

// ===== USUARIOS BASE =====
const usuariosBase = [
  { nombre: "Bastian Sanches", email: "ba.sanches@duocuc.cl", password: "asd123", rol: "admin" },
  { nombre: "Carlos Martinez", email: "admin4@sb.com", password: "123", rol: "admin" }
];

const InicioSesion = () => {
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const { login, notify } = useAuth();

  // ===== CARGA INICIAL =====
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios"));
    if (!data) {
      localStorage.setItem("usuarios", JSON.stringify(usuariosBase));
      setUsuarios(usuariosBase);
    } else {
      setUsuarios(data);
    }
  }, []);

  const navigate = useNavigate();

  // ===== LOGIN =====
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value.trim();
    const password = e.target.loginPassword.value.trim();

    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      // use AuthContext login which will persist and show toast
      login(usuario);
      if (String(usuario.rol || '').toLowerCase() === 'admin') {
        navigate("/admin/home-admin");
      } else {
        navigate("/home");
      }
    } else {
      notify({ title: 'Error', body: 'Correo o contraseña incorrectos', variant: 'danger' });
    }
  };

  // ===== REGISTRO =====
  const handleRegister = (e) => {
    e.preventDefault();
    const nombre = e.target.registerName.value.trim();
    const email = e.target.registerEmail.value.trim();
    const password = e.target.registerPassword.value.trim();

    const existe = usuarios.some((u) => u.email === email);
    if (existe) {
      notify({ title: 'Error', body: 'Este correo ya está registrado', variant: 'warning' });
      return;
    }

    const nuevo = { nombre, email, password, rol: "user" };
    const nuevosUsuarios = [...usuarios, nuevo];

  localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    // log the user in via context
    login(nuevo);
    notify({ title: 'Cuenta creada', body: `Cuenta creada para ${nombre}`, variant: 'success' });
    setMostrarLogin(true);
    // redirigir al home del cliente tras registro
    navigate("/home");
  };

  return (
    <div className="background-gradient">

      <div className="container-fluid py-5">
        <HeroBanner
          title="¡Bienvenido!"
          subtitle="Inicia sesión o crea tu cuenta para recibir descuentos exclusivos"
          gradient="rgba(0, 0, 0, 0.55)"
        />
      </div>

      <section className="admin-options">
        {mostrarLogin ? (
          <div className="admin-card" id="login-card">
            <h3>Iniciar Sesión</h3>
            <p>Ingresa a tu cuenta para acceder a beneficios.</p>
            <form id="loginForm" onSubmit={handleLogin}>
              <input
                type="email"
                name="loginEmail"
                placeholder="Correo electrónico"
                required
                className="input-box"
              />
              <input
                type="password"
                name="loginPassword"
                placeholder="Contraseña"
                required
                className="input-box"
              />
              <button type="submit" className="cta-btn">
                Entrar
              </button>
            </form>
            <p style={{ marginTop: "15px" }}>
              ¿No tienes cuenta?{" "}
              <button
                className="link-button"
                onClick={() => setMostrarLogin(false)}
                style={{ color: "#d6336c", fontWeight: "600", background: 'none', border: 'none' }}
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        ) : (
          <div className="admin-card" id="register-card">
            <h3>Crear Cuenta</h3>
            <p>Regístrate como cliente frecuente y recibe descuentos.</p>
            <form id="registerForm" onSubmit={handleRegister}>
              <input
                type="text"
                name="registerName"
                placeholder="Nombre completo"
                required
                className="input-box"
              />
              <input
                type="email"
                name="registerEmail"
                placeholder="Correo electrónico"
                required
                className="input-box"
              />
              <input
                type="password"
                name="registerPassword"
                placeholder="Contraseña"
                required
                className="input-box"
              />
              <button type="submit" className="cta-btn">
                Registrarme
              </button>
            </form>
            <p style={{ marginTop: "15px" }}>
              ¿Ya tienes cuenta?{" "}
              <button
                className="link-button"
                onClick={() => setMostrarLogin(true)}
                style={{ color: "#d6336c", fontWeight: "600", background: 'none', border: 'none' }}
              >
                Inicia sesión
              </button>
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default InicioSesion;
