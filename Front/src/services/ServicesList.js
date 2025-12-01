import React, { useEffect, useState } from 'react';
import { fetchServices } from '../api';

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices()
      .then(data => setServices(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h2>Servicios</h2>
      <ul>
        {services.map((s, i) => (
          <li key={i}>
            <strong>{s.name}</strong> — {s.description} ({s.price} USD)
          </li>
        ))}
      </ul>
    </div>
  );
}