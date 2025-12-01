import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Importar Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// During development we want to force re-login on each dev server start.
// Clear any persisted session keys so the app asks for credentials every time
// you run `npm start`. This runs only when NODE_ENV === 'development'.
if (process.env.NODE_ENV === 'development') {
  try {
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('currentUser');
  } catch (e) {
    // ignore when localStorage is not available
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
