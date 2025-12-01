import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [toast, setToast] = useState({ show: false, title: '', body: '', variant: 'info' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('usuarioActivo');
      if (raw) setUsuario(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const notify = ({ title = '', body = '', variant = 'info' }) => {
    setToast({ show: true, title, body, variant });
    // auto hide in 3s
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };

  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  const login = (u) => {
    setUsuario(u);
    try { localStorage.setItem('usuarioActivo', JSON.stringify(u)); } catch (e) {}
    notify({ title: 'Bienvenido', body: `Hola ${u.nombre}`, variant: 'success' });
  };

  const logout = () => {
    setUsuario(null);
    try { localStorage.removeItem('usuarioActivo'); } catch (e) {}
    notify({ title: 'Sesión cerrada', body: 'Has cerrado sesión', variant: 'warning' });
  };

  const updateUsuario = (u) => {
    setUsuario(u);
    try { localStorage.setItem('usuarioActivo', JSON.stringify(u)); } catch (e) {}
    notify({ title: 'Guardado', body: 'Datos actualizados', variant: 'success' });
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, updateUsuario, toast, notify, hideToast }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
