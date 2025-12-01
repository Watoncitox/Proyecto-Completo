import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../../components/Hero/HeroBanner';
import fondo from '../../../assets/img/fondo/servicios/fondo_servicio.png';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [paid, setPaid] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const items = useMemo(() => cart || [], [cart]);
  const { usuario } = useAuth();

  const total = useMemo(() => {
    return items.reduce((sum, it) => {
      const p = it.precio ?? it.price ?? it.unitPrice ?? 0;
      const q = it.quantity ?? it.cantidad ?? 1;
      return sum + (Number(p) || 0) * (Number(q) || 1);
    }, 0);
  }, [items]);

  const hasPhysicalProducts = items.some((it) => (it.type && it.type !== 'booking') || (!it.type && !(it.serviceKey))); // heurística

  const handlePay = () => {
    // Simular pago: crear orden, vaciar carrito y mostrar voucher
    const orderId = `ORD-${Date.now()}`;
    setOrder({ id: orderId, items: [...items], total });
    clearCart();
    setPaid(true);
  };

  const handlePrintVoucher = (ord) => {
    if (!ord) return;
    const itemsHtml = (ord.items || []).map((it, i) => {
      const name = it.nombre || it.name || it.title || 'Item';
      const qty = it.quantity ?? it.cantidad ?? 1;
      const price = it.precio ?? it.price ?? it.unitPrice ?? 0;
      const subtotal = (Number(price) || 0) * qty;
      return `<tr key=${i}><td>${name}</td><td>${qty}</td><td>$${Number(price).toLocaleString('es-CL')} ${it.currency || 'CLP'}</td><td>$${subtotal.toLocaleString('es-CL')} ${it.currency || 'CLP'}</td></tr>`;
    }).join('');

    const html = `
      <!doctype html>
      <html>
        <head>
        
        </head>
        <head>
          <meta charset="utf-8" />
          <title>Voucher ${ord.id}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #111 }
            h1 { font-size: 20px }
            table { width: 100%; border-collapse: collapse; margin-top: 12px }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left }
            .total { margin-top: 12px; font-weight: 700 }
            .bottom-btn { position: fixed; left: 0; right: 0; bottom: 12px; display:flex; justify-content:center }
            .btn { background: #0d6efd; color: white; padding: 10px 18px; border-radius: 6px; border: none; text-decoration: none }
            @media print { .bottom-btn { display: none } }
          </style>
        </head>
        <body>
          <h1>Voucher de Pago</h1>
          <p><strong>Orden:</strong> ${ord.id}</p>
          <p><strong>Total:</strong> $${ord.total.toLocaleString('es-CL')} CLP</p>
          <h4>Datos del cliente</h4>
          <p><strong>Nombre:</strong> ${usuario?.nombre || ''} <br/><strong>RUT:</strong> ${usuario?.rut || ''} <br/><strong>Correo:</strong> ${usuario?.email || ''} <br/><strong>Teléfono:</strong> ${usuario?.telefono || usuario?.phone || ''}</p>
          <table>
            <thead><tr><th>Item</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th></tr></thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="margin-top:18px">Presenta este voucher en la clínica para recoger productos si corresponde.</div>
          <div class="bottom-btn">
            <button class="btn" onclick="if(window.opener){window.opener.location.href='/'}; window.close();">Volver al inicio</button>
          </div>
        </body>
      </html>
    `;

    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) return alert('No se pudo abrir la ventana de impresión. Revisa el bloqueador de popups.');
    w.document.write(html);
    w.document.close();
    w.focus();
    // Give the new window a moment to render then trigger print
    setTimeout(() => {
      w.print();
    }, 300);
  };

  return (
    <>
      <div className="container-fluid py-5">
        <HeroBanner
          title={paid ? "Pagado" : "Procediendo al pago"}
          subtitle={paid ? "Tu pago ha sido registrado" : "Detalle y pago de tu compra"}
          backgroundImage={fondo}
          gradient="rgba(0,0,0,0.55)"
          showButton={false}
        />
      </div>

      <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={6} className="mx-auto">
          <div className="card p-4">
            <h2 className="mb-3">Detalle de Compra</h2>

          {items.length === 0 && !paid && (
            <Alert variant="info">Tu carrito está vacío. Añade servicios o productos antes de pagar.</Alert>
          )}

          {items.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
            {/* Datos del usuario */}
            <div className="mb-3 p-3 border rounded bg-light">
              <strong>Cliente:</strong> {usuario?.nombre || '-'}<br />
              <strong>RUT:</strong> {usuario?.rut || '-'}<br />
              <strong>Correo:</strong> {usuario?.email || '-'}<br />
              <strong>Teléfono:</strong> {usuario?.telefono || usuario?.phone || '-'}
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => {
                  const name = it.nombre || it.name || it.title || 'Item';
                  const qty = it.quantity ?? it.cantidad ?? 1;
                  const price = it.precio ?? it.price ?? it.unitPrice ?? 0;
                  const subtotal = (Number(price) || 0) * qty;
                  return (
                    <tr key={it.id || i}>
                      <td>{name}</td>
                      <td>{qty}</td>
                      <td>${Number(price).toLocaleString('es-CL')} {it.currency || 'CLP'}</td>
                      <td>${subtotal.toLocaleString('es-CL')} {it.currency || 'CLP'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Total: ${total.toLocaleString('es-CL')} CLP</h4>
            {!paid ? (
              <div>
                <Button variant="success" className="me-2" onClick={handlePay} disabled={items.length === 0}>Pagar</Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>Seguir comprando</Button>
              </div>
            ) : (
              <Button variant="primary" onClick={() => { navigate('/'); }}>Volver al inicio</Button>
            )}
          </div>

          {hasPhysicalProducts && !paid && (
            <Alert variant="warning" className="mt-3">
              Has agregado productos físicos al carrito. Estos productos deben ser retirados presencialmente en la clínica presentando el voucher de compra.
            </Alert>
          )}

          {paid && order && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h5>Voucher de pago</h5>
              <p><strong>Orden:</strong> {order.id}</p>
              <p><strong>Total:</strong> ${order.total.toLocaleString('es-CL')} CLP</p>
              <p>Presenta este voucher en la clínica para recoger productos si corresponde.</p>
              <Button variant="outline-primary" className="me-2" onClick={() => handlePrintVoucher(order)}>Imprimir Voucher</Button>
              <Button variant="success" onClick={() => navigate('/')}>Finalizar</Button>
            </div>
          )}
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}
