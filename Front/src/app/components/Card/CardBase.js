// src/app/components/Card/CardBase.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import "./CardBase.css";

export default function CardBase({
  image,
  title,
  text,
  buttonText,
  onButtonClick,
  variant = "outline-danger",
  height = 230,
  className = "",
}) {
  return (
    <Card className={`card-base shadow-sm border-0 text-center h-100 ${className}`}>
      {image && (
        <div className="card-image-wrapper">
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            style={{ objectFit: "cover", height }}
          />
        </div>
      )}

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold text-dark">{title}</Card.Title>
          {text && <Card.Text className="text-muted small">{text}</Card.Text>}
        </div>

        {buttonText && (
          <Button
            variant={variant}
            onClick={onButtonClick}
            className="rounded-pill mt-2"
          >
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
