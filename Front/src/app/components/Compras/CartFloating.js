import React from "react";
import { useCart } from "../../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CartFloating = () => {
    const { cart, toggleSidebar } = useCart();

    return (
        <div
            onClick={toggleSidebar}
            style={{
                position: "fixed",
                bottom: "25px",
                right: "25px",
                background: "#000",
                color: "#fff",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                zIndex: "2000",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}
        >
            🛒
            {cart.length > 0 && (
                <span
                    className="badge bg-danger"
                    style={{ position: "absolute", top: "-5px", right: "-5px" }}
                >
                    {cart.length}
                </span>
            )}
        </div>
    );
};

export default CartFloating;
