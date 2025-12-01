import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarCliente from "./app/components/Navbar/Navbar-cliente";
import NavbarAdmin from "./app/components/Navbar/Navbar-admin";     
import HomeCliente from "./app/pages/cliente/home-cliente/home-cliente";
import HomeAdmin from "./app/pages/admin/home-admin/home-admin";
import RequireAdmin from "./app/components/Auth/RequireAdmin";
import Contacto from "./app/pages/cliente/contacto/contacto";
import Nosotros from "./app/pages/cliente/nosotros/nosotros";
import InicioSesion from "./app/pages/inicio-sesion/inicio-sesion";
import ClientesAdmin from "./app/pages/admin/clientes/clientes";
import AgendaAdmin from "./app/pages/admin/agenda/agenda";
import ProductosCRUD from "./app/pages/admin/productos-crud/productos-crud";
import ServiciosCRUD from "./app/pages/admin/servicios-crud/servicios-crud";
import UsuarioAdmin from "./app/pages/admin/usuario-admin/usuario-admin";
import ProductosCliente from "./app/pages/cliente/productos/productos";
import ProductoDetalle from "./app/pages/cliente/producto-detalle/producto-detalle";
import Kerastase from "./app/pages/cliente/productos/kerastase/kerastase";
import Loreal from "./app/pages/cliente/productos/loreal/loreal";
import Checkout from "./app/pages/cliente/checkout/checkout";
import ServiciosPage from "./app/pages/cliente/servicios/servicios"; 
import Cosmetologia from "./app/pages/cliente/servicios/cosmetologia/cosmetologia";
import CorporalesSpa from "./app/pages/cliente/servicios/spa-corporal/corporales-spa";
import ManicurePedicure from "./app/pages/cliente/servicios/manicure-pedicure/manicure-pedicure";
import CorteColor from "./app/pages/cliente/servicios/peluqueria/corte-color";
import Maquillaje from "./app/pages/cliente/servicios/maquillaje/maquillaje";
import Capilares from "./app/pages/cliente/servicios/tratamientos-capilares/capilares";
import PerfilPage from "./app/pages/cliente/perfil/PerfilPage";
import AgendarHora from "./app/pages/cliente/agendar-hora/agendar-hora";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { ToastContainer, Toast } from 'react-bootstrap';
import { CartProvider } from "./app/context/CartContext";
import CartSidebar from "./app/components/Compras/CartSidebar";
import CartFloating from "./app/components/Compras/CartFloating";

function AppRouter() {
  const { usuario, toast, hideToast } = useAuth();

  const isAdmin = usuario && String(usuario.rol || '').toLowerCase() === 'admin';

  React.useEffect(() => {
    // add a body class so styles can target admin views
    if (isAdmin) {
      document.body.classList.add('admin-bg');
    } else {
      document.body.classList.remove('admin-bg');
    }
    return () => {
      document.body.classList.remove('admin-bg');
    };
  }, [isAdmin]);

  return (
    <BrowserRouter>
      {/* Navbar decidido por el contexto */}
      {isAdmin ? <NavbarAdmin /> : <NavbarCliente />}
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomeCliente />} />
          <Route path="/home" element={<HomeCliente />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/servicios/cosmetologia" element={<Cosmetologia />} />
          <Route path="/servicios/corporales" element={<CorporalesSpa />} />
          <Route path="/servicios/manicure" element={<ManicurePedicure />} />
          <Route path="/servicios/corte-y-color" element={<CorteColor />} />
          <Route path="/servicios/maquillaje" element={<Maquillaje />} />
          <Route path="/servicios/capilares" element={<Capilares />} />
          <Route path="/agendar-hora" element={<AgendarHora />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productos" element={<ProductosCliente />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/productos/kerastase" element={<Kerastase />} />
          <Route path="/productos/loreal" element={<Loreal />} />
      
          <Route path="/inicio-sesion" element={<InicioSesion />} />
          <Route path="/perfil" element={<PerfilPage />} />

          <Route path="/admin/home-admin" element={<RequireAdmin><HomeAdmin /></RequireAdmin>} />
          <Route path="/admin/clientes" element={<RequireAdmin><ClientesAdmin /></RequireAdmin>} />
          <Route path="/admin/agenda" element={<RequireAdmin><AgendaAdmin /></RequireAdmin>} />
          <Route path="/admin/productos" element={<RequireAdmin><ProductosCRUD /></RequireAdmin>} />
          <Route path="/admin/usuario" element={<RequireAdmin><UsuarioAdmin /></RequireAdmin>} />
          <Route path="/admin/servicios-crud" element={<RequireAdmin><ServiciosCRUD /></RequireAdmin>} />
        </Routes>

        {/* Carrito global: sidebar + botón flotante (solo para clientes) */}
        {!isAdmin && (
          <>
            <CartSidebar />
            <CartFloating />
          </>
        )}
      </CartProvider>
      {/* Global toast container driven by AuthContext */}
      <ToastContainer position="bottom-end" className="p-3">
        {toast && (
          <Toast onClose={hideToast} show={!!toast.show} bg={toast.variant} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.body}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}