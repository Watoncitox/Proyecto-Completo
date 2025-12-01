import React from "react";
import NavbarCliente from "../../../components/Navbar/Navbar-cliente";
import HeroBanner from "../../../components/Hero/HeroBanner";
import MarcaCard from "../../../components/Card/Card-Productos/Card-Productos";
import "./productos.css";
import { useEffect, useState } from "react";
import { getProductosNormalized as getProductos } from "../../../../services/productsService";

// Import de imágenes
import productosFondo from "../../../assets/img/fondo/Productos/productosFondo.png";
import kerastaseImg from "../../../assets/img/fondo/Productos/kerastase.jpg";
import lorealImg from "../../../assets/img/fondo/Productos/loreal.jpg";

const ProductosPage = () => {
  const [, setProductos] = useState([]);

  useEffect(() => {
    setProductos(getProductos());
    const handler = () => setProductos(getProductos());
    window.addEventListener('productos:changed', handler);
    // also listen to storage event for multi-tab
    const storageHandler = (e) => { if (e.key === 'productos_v5') setProductos(getProductos()); };
    window.addEventListener('storage', storageHandler);
    return () => { window.removeEventListener('productos:changed', handler); window.removeEventListener('storage', storageHandler); };
  }, []);
  const marcas = [
    {
      titulo: "Kerastase",
      imagen: kerastaseImg,
      descripcion:
        "En DYB confiamos en Kerastase porque comparte nuestra visión de un cuidado capilar de lujo, personalizado y con resultados visibles desde la primera aplicación.",
      parrafos: [
        "Cada línea de productos está desarrollada con una base científica sólida, lo que garantiza un equilibrio perfecto entre eficacia y sensorialidad.",
        "Elegimos Kerastase porque entendemos que cada persona merece un tratamiento exclusivo, diseñado para potenciar la belleza natural de su cabello.",
      ],
      beneficios: [
        "Tratamientos adaptados a cada tipo de cabello y cuero cabelludo.",
        "Innovación constante respaldada por la investigación científica.",
        "Resultados visibles: más fuerza, brillo y suavidad.",
        "Experiencia sensorial premium en cada uso.",
      ],
        link: "/productos/kerastase",
    },
    {
      titulo: "L'Oréal Professionnel",
      imagen: lorealImg,
      descripcion:
        "En DYB trabajamos con L'Oréal Professionnel porque es una marca líder en innovación y tendencias, siempre a la vanguardia del cuidado profesional.",
      parrafos: [
        "Sus productos combinan la experiencia científica con la creatividad, ofreciendo soluciones que transforman el cabello con resultados profesionales.",
        "Confiamos en L'Oréal porque nos permite ofrecer a nuestros clientes lo mejor en moda capilar, color y cuidado, garantizando siempre un resultado saludable y de calidad.",
      ],
      beneficios: [
        "Coloraciones de alta precisión y larga duración.",
        "Amplia gama de productos para todo tipo de cabello.",
        "Innovaciones tecnológicas para reparación y nutrición profunda.",
        "Respaldo de expertos en peluquería a nivel mundial.",
      ],
        link: "/productos/loreal",
      reverse: true,
    },
  ];

  return (
    <div className="background-gradient">
      <NavbarCliente />

      {/* Hero principal */}
      <div className="container-fluid py-5">
        <HeroBanner
          title="DYB"
          subtitle="Productos"
          backgroundImage={productosFondo}
          gradient="rgba(0, 0, 0, 0.25)"
          textGradient="linear-gradient(135deg, #f7e6eb 0%, #f8c6c8 50%, #eab1c6 100%)"
        />
      </div>

      {/* Sección de marcas */}
      {marcas.map((marca, i) => (
        <MarcaCard key={i} {...marca} />
      ))}

      {/* Separador decorativo */}
      <div className="custom-separator">
        <span className="separator-text">Comprometidos con la experiencia</span>
      </div>
    </div>
  );
};

export default ProductosPage;
