import React, { useEffect } from "react";
import NavbarBase from "./NavbarBase";

export default function NavbarAdmin() {
  const links = [
    { to: "/admin/home-admin", label: "Inicio" },
    { to: "/admin/clientes", label: "Clientes" },
    { to: "/admin/productos", label: "Productos" },
    { to: "/admin/servicios-crud", label: "Servicios" },
    { to: "/admin/agenda", label: "Agenda" },
    { to: "/admin/usuario", label: "Usuario" },
  ];

  useEffect(() => {
    // Ensure client theme is removed when admin navbar mounts
    document.body.classList.remove("client-theme");
  }, []);

  return <NavbarBase links={links} brandColor="dark" />;
}
