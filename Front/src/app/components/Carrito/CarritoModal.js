import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCart } from "../../hooks/useCart";
import "./CarritoModal.css";

const CarritoModal = ({ show, handleClose }) => {
  const { carrito, removeFromCart, clearCart } = useCart();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito de compras</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          carrito.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.nombre} />
              <div>
                <h5>{item.nombre}</h5>
                <p>${item.precio}</p>
              </div>
              <Button
                variant="danger"
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </Button>
            </div>
          ))
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={clearCart}>
          Vaciar carrito
        </Button>
        <Button variant="success">Ir a pagar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarritoModal;
