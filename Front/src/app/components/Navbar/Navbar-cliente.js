import React, { useEffect } from "react";
import NavbarBase from "./NavbarBase";
import "../../styles/client-theme.css";

export default function NavbarCliente() {
  const links = [
    { to: "/home", label: "Inicio" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/servicios", label: "Servicios" },
    { to: "/contacto", label: "Contacto" },
    { to: "/productos", label: "Productos" },
    { to: "/agendar-hora", label: "Agendar Hora" },
    { to: "/perfil", label: "Mi Cuenta" },
  ];

  useEffect(() => {
    // Add a class to body so all client views share the same background
    document.body.classList.add("client-theme");
    // Intentionally do not remove the class on unmount to avoid flicker
    // when navigating between client pages. The admin navbar will remove
    // the class when admin routes mount.
  }, []);

  return <NavbarBase links={links} brandColor="danger" />;
}
