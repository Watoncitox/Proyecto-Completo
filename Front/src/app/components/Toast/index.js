import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Flash({ initial = '' }) {
  const [show, setShow] = useState(!!initial);
  const [text, setText] = useState(initial);

  useEffect(() => {
    setText(initial);
    setShow(!!initial);
    if (initial) {
      const t = setTimeout(() => setShow(false), 2600);
      return () => clearTimeout(t);
    }
  }, [initial]);

  if (!text) return null;

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast onClose={() => setShow(false)} show={show} bg="dark" delay={2600} autohide>
        <Toast.Header>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

Flash.propTypes = {
  initial: PropTypes.string,
};
