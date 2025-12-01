import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const { usuario } = useAuth();

  if (usuario && String(usuario.rol || '').toLowerCase() === 'admin') {
    return children;
  }

  return <Navigate to="/inicio-sesion" state={{ from: location }} replace />;
};

export default RequireAdmin;
