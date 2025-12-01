import React from "react";
import { Button } from "react-bootstrap";
import "./HeroBanner.css";

export default function HeroBanner({
  title = "Bienvenida a Nuestra Clínica Estética",
  subtitle = "Cuidamos tu belleza y bienestar",
  buttonText = "Agenda tu Hora",
  onButtonClick,
  backgroundImage,
  backgroundVideo,
  gradient = "rgba(0, 0, 0, 0.5)",
  textGradient = "linear-gradient(90deg, #e05eff, #c467f8)",
  showButton = true,
}) {
  // If a video is provided, we don't set a CSS background image
  const heroStyle = backgroundVideo
    ? { borderRadius: "16px" }
    : {
        backgroundImage: `linear-gradient(${gradient}, ${gradient}), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "16px",
      };

  return (
    <div className="hero-banner d-flex flex-column justify-content-center align-items-center text-center text-white p-5" style={heroStyle}>
      {/* Video background (if provided) */}
      {backgroundVideo && (
        <video
          className="hero-video"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <h1 className="fw-bold mb-3">
        {title ? (
          <>{title.split(" ")[0]} <span style={{ background: textGradient, WebkitBackgroundClip: "text", color: "transparent" }}>{title.split(" ").slice(1).join(" ")}</span></>
        ) : (
          ""
        )}
      </h1>
      {subtitle && <p className="lead mb-4">{subtitle}</p>}

      {showButton && (
        <Button
          variant="custom"
          size="lg"
          className="rounded-pill px-4 py-2 fw-semibold"
          onClick={onButtonClick}
        >
          {/* Inline lightweight calendar SVG to avoid extra dependency */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-calendar3 me-2"
            viewBox="0 0 16 16"
          >
            <path d="M14 3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1V1.5a.5.5 0 0 1 1 0V3h8V1.5a.5.5 0 0 1 1 0V3zM1 5v8h14V5H1z"/>
          </svg>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
