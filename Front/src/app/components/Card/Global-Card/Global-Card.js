import React from "react";
import { useNavigate } from "react-router-dom";
import CardBase from "../CardBase";
import "./Global-Card.css";

export default function GlobalCard({ image, title, description, ctaText, ctaLink }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!ctaLink) return;
    // If it's an internal route (starts with /), use react-router navigation
    if (typeof ctaLink === "string" && ctaLink.startsWith("/")) {
      navigate(ctaLink);
    } else {
      // external link: open in new tab
      window.open(ctaLink, "_blank");
    }
  };

  return (
    <CardBase
      image={image}
      title={title}
      text={description}
      buttonText={ctaText}
      onButtonClick={handleClick}
      variant="outline-dark"
      className="global-card"
    />
  );
}
