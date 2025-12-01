import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSidebar = () => {
    const { cart, removeFromCart, sidebarOpen, toggleSidebar, clearCart } = useCart();

    const navigate = useNavigate();

    const goToCheckout = () => {
        // close sidebar and navigate
        toggleSidebar();
        navigate('/checkout');
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: sidebarOpen ? "0" : "-350px",
                width: "350px",
                height: "100vh",
                backgroundColor: "#f8f9fa",
                boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
                padding: "20px",
                transition: "0.3s",
                zIndex: "3000"
            }}
        >
            <h4 className="fw-bold">Tu Carrito</h4>
            <button className="btn btn-sm btn-secondary mb-3" onClick={toggleSidebar}>Cerrar</button>

            <div style={{ overflowY: "auto", height: "75vh" }}>
                {cart.length === 0 ? (
                    <p className="text-muted">El carrito está vacío</p>
                ) : (
                    cart.map((item, i) => {
                        const displayName = item.nombre || item.name || item.title || "Item";
                        const displayType = item.tipo || item.type || "";
                        const precioRaw = item.precio ?? item.price ?? item.unitPrice ?? 0;
                        const currency = item.currency || "CLP";
                        const formattedPrice = typeof precioRaw === 'number'
                            ? precioRaw.toLocaleString('es-CL')
                            : String(precioRaw);

                        return (
                            <div key={item.id || i} className="border-bottom py-2">
                                <h6 className="m-0">{displayName}</h6>
                                {displayType && <small className="text-muted">{displayType}</small>}
                                <p className="m-0 fw-bold">${formattedPrice} {currency}</p>

                                <button
                                    className="btn btn-sm btn-danger mt-1"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {cart.length > 0 && (
                <div className="d-flex gap-2 mt-3" style={{ alignItems: 'stretch' }}>
                    <button className="btn btn-success flex-fill" style={{ minHeight: 44 }} onClick={goToCheckout}>Pagar</button>
                    <button className="btn btn-dark flex-fill" style={{ minHeight: 44 }} onClick={clearCart}>Vaciar Carrito</button>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
