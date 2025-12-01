# Plan de Integración Front-End y Back-End

## 📊 Estado Actual

### Backend (Spring Boot 3.3.5)
- ✅ Servidor corriendo en `http://localhost:8080`
- ✅ Base de datos: Oracle Database
- ✅ Autenticación: Firebase + Spring Security
- ✅ APIs REST completamente funcionales con CORS habilitado
- ✅ Controladores implementados para: Productos, Servicios, Usuarios, Trabajadores, Horarios, Inventario, Pagos, Promociones, Proveedores, Categorías

### Frontend (React 19 + Bootstrap + Axios)
- ✅ Proyecto React configurado
- ✅ Axios ya instalado y configurado
- ✅ Estructura de servicios lista
- ⚠️ **Problema**: Los servicios NO están usando las APIs del backend, solo localStorage simulado

---

## 🎯 Objetos de la Integración

### 1. **Actualizar Configuración de Axios**
### 2. **Conectar todos los servicios al Backend**
### 3. **Implementar manejo de errores y loading states**
### 4. **Asegurar CORS y autenticación**
### 5. **Documentar endpoints disponibles**

---

## 📋 APIs Disponibles en Backend

```
AUTH
├── POST   /auth/login              → Autenticación con Firebase

PRODUCTOS
├── GET    /api/productos            → Listar todos
├── POST   /api/productos            → Crear nuevo
├── GET    /api/productos/{id}       → Obtener por ID
├── DELETE /api/productos/{id}       → Eliminar

SERVICIOS
├── GET    /api/servicios            → Listar todos
├── POST   /api/servicios            → Crear nuevo
├── GET    /api/servicios/{id}       → Obtener por ID

CATEGORÍAS SERVICIOS
├── GET    /api/categorias-servicios → Listar todas
├── POST   /api/categorias-servicios → Crear nueva
├── DELETE /api/categorias-servicios/{id} → Eliminar

USUARIOS
├── GET    /api/usuarios             → Listar todos
├── POST   /api/usuarios             → Crear nuevo
├── GET    /api/usuarios/{id}        → Obtener por ID

TRABAJADORES
├── GET    /api/trabajadores         → Listar todos
├── POST   /api/trabajadores         → Crear nuevo
├── GET    /api/trabajadores/{id}    → Obtener por ID
├── PUT    /api/trabajadores/{id}    → Actualizar
├── DELETE /api/trabajadores/{id}    → Eliminar

HORARIOS
├── GET    /api/horarios             → Listar todos
├── POST   /api/horarios             → Crear nuevo
├── GET    /api/horarios/{id}        → Obtener por ID
├── PUT    /api/horarios/{id}        → Actualizar
├── DELETE /api/horarios/{id}        → Eliminar

INVENTARIO
├── GET    /api/inventario           → Listar todos
├── POST   /api/inventario           → Crear nuevo
├── GET    /api/inventario/{id}      → Obtener por ID
├── PUT    /api/inventario/{id}      → Actualizar
├── DELETE /api/inventario/{id}      → Eliminar

PAGOS
├── GET    /api/pagos                → Listar todos
├── POST   /api/pagos                → Crear nuevo
├── GET    /api/pagos/{id}           → Obtener por ID

PROMOCIONES
├── GET    /api/promociones          → Listar todas
├── POST   /api/promociones          → Crear nueva
├── GET    /api/promociones/{id}     → Obtener por ID
├── DELETE /api/promociones/{id}     → Eliminar

PROVEEDORES
├── GET    /api/proveedores          → Listar todos
├── POST   /api/proveedores          → Crear nuevo
├── GET    /api/proveedores/{id}     → Obtener por ID
├── DELETE /api/proveedores/{id}     → Eliminar
```

---

## 🔧 Cambios Necesarios

### **PASO 1: Variables de Entorno (.env)**

Crear archivo `.env` en la raíz del proyecto Frontend:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=development
```

---

### **PASO 2: Actualizar Configuración de Axios**

**Archivo: `Front/src/api/axiosConfig.js`**

```javascript
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar token Firebase
api.interceptors.request.use(async (config) => {
    try {
        const user = window.firebase?.auth()?.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error("Error getting Firebase token:", error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejo de errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("No autorizado - redirigir a login");
            // Aquí puedes redirigir a login si lo necesitas
        }
        return Promise.reject(error);
    }
);

export default api;
```

---

### **PASO 3: Actualizar Todos los Servicios**

#### **authService.js**
```javascript
import api from "../api/axiosConfig";

export const loginWithFirebaseToken = async (idToken) => {
    const response = await api.post("/auth/login", { idToken });
    return response.data;
};

export const logout = async () => {
    // Limpiar sesión en backend si es necesario
    return Promise.resolve();
};
```

#### **productsService.js**
```javascript
import api from "../api/axiosConfig";

export const getProductos = async () => {
    const response = await api.get("/api/productos");
    return response.data;
};

export const getProductoById = async (id) => {
    const response = await api.get(`/api/productos/${id}`);
    return response.data;
};

export const createProducto = async (data) => {
    const response = await api.post("/api/productos", data);
    return response.data;
};

export const updateProducto = async (id, data) => {
    const response = await api.put(`/api/productos/${id}`, data);
    return response.data;
};

export const deleteProducto = async (id) => {
    await api.delete(`/api/productos/${id}`);
};
```

#### **servicesService.js**
```javascript
import api from "../api/axiosConfig";

export const getServicios = async () => {
    const response = await api.get("/api/servicios");
    return response.data;
};

export const getServicioById = async (id) => {
    const response = await api.get(`/api/servicios/${id}`);
    return response.data;
};

export const createServicio = async (data) => {
    const response = await api.post("/api/servicios", data);
    return response.data;
};

export const deleteServicio = async (id) => {
    await api.delete(`/api/servicios/${id}`);
};
```

#### **usuariosService.js**
```javascript
import api from "../api/axiosConfig";

export const getUsuarios = async () => {
    const response = await api.get("/api/usuarios");
    return response.data;
};

export const getUsuarioById = async (id) => {
    const response = await api.get(`/api/usuarios/${id}`);
    return response.data;
};

export const createUsuario = async (data) => {
    const response = await api.post("/api/usuarios", data);
    return response.data;
};
```

#### **clienteService.js**
```javascript
import api from "../api/axiosConfig";

export const getClientes = async () => {
    const response = await api.get("/api/usuarios?role=cliente");
    return response.data;
};

export const createCliente = async (data) => {
    const response = await api.post("/api/usuarios", data);
    return response.data;
};
```

#### **trabajadoresService.js**
```javascript
import api from "../api/axiosConfig";

export const getTrabajadores = async () => {
    const response = await api.get("/api/trabajadores");
    return response.data;
};

export const getTrabajadorById = async (id) => {
    const response = await api.get(`/api/trabajadores/${id}`);
    return response.data;
};

export const createTrabajador = async (data) => {
    const response = await api.post("/api/trabajadores", data);
    return response.data;
};

export const updateTrabajador = async (id, data) => {
    const response = await api.put(`/api/trabajadores/${id}`, data);
    return response.data;
};

export const deleteTrabajador = async (id) => {
    await api.delete(`/api/trabajadores/${id}`);
};
```

#### **horariosService.js**
```javascript
import api from "../api/axiosConfig";

export const getHorarios = async () => {
    const response = await api.get("/api/horarios");
    return response.data;
};

export const getHorarioById = async (id) => {
    const response = await api.get(`/api/horarios/${id}`);
    return response.data;
};

export const createHorario = async (data) => {
    const response = await api.post("/api/horarios", data);
    return response.data;
};

export const updateHorario = async (id, data) => {
    const response = await api.put(`/api/horarios/${id}`, data);
    return response.data;
};

export const deleteHorario = async (id) => {
    await api.delete(`/api/horarios/${id}`);
};
```

#### **inventarioService.js**
```javascript
import api from "../api/axiosConfig";

export const getInventario = async () => {
    const response = await api.get("/api/inventario");
    return response.data;
};

export const getInventarioById = async (id) => {
    const response = await api.get(`/api/inventario/${id}`);
    return response.data;
};

export const createInventario = async (data) => {
    const response = await api.post("/api/inventario", data);
    return response.data;
};

export const updateInventario = async (id, data) => {
    const response = await api.put(`/api/inventario/${id}`, data);
    return response.data;
};

export const deleteInventario = async (id) => {
    await api.delete(`/api/inventario/${id}`);
};
```

#### **promocionesService.js**
```javascript
import api from "../api/axiosConfig";

export const getPromociones = async () => {
    const response = await api.get("/api/promociones");
    return response.data;
};

export const getPromocionById = async (id) => {
    const response = await api.get(`/api/promociones/${id}`);
    return response.data;
};

export const createPromocion = async (data) => {
    const response = await api.post("/api/promociones", data);
    return response.data;
};

export const deletePromocion = async (id) => {
    await api.delete(`/api/promociones/${id}`);
};
```

#### **proveedoresService.js**
```javascript
import api from "../api/axiosConfig";

export const getProveedores = async () => {
    const response = await api.get("/api/proveedores");
    return response.data;
};

export const getProveedorById = async (id) => {
    const response = await api.get(`/api/proveedores/${id}`);
    return response.data;
};

export const createProveedor = async (data) => {
    const response = await api.post("/api/proveedores", data);
    return response.data;
};

export const deleteProveedor = async (id) => {
    await api.delete(`/api/proveedores/${id}`);
};
```

#### **categoriasServicioService.js**
```javascript
import api from "../api/axiosConfig";

export const getCategorias = async () => {
    const response = await api.get("/api/categorias-servicios");
    return response.data;
};

export const createCategoria = async (data) => {
    const response = await api.post("/api/categorias-servicios", data);
    return response.data;
};

export const deleteCategoria = async (id) => {
    await api.delete(`/api/categorias-servicios/${id}`);
};
```

#### **pagosService.js** (si existe)
```javascript
import api from "../api/axiosConfig";

export const getPagos = async () => {
    const response = await api.get("/api/pagos");
    return response.data;
};

export const getPagoById = async (id) => {
    const response = await api.get(`/api/pagos/${id}`);
    return response.data;
};

export const createPago = async (data) => {
    const response = await api.post("/api/pagos", data);
    return response.data;
};
```

---

### **PASO 4: Backend - Configurar CORS (si no está)**

**En application.properties del Backend (ya está configurado):**
```properties
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

O en el controlador (ya presente):
```java
@CrossOrigin(origins = "*")
public class ProductController { ... }
```

---

### **PASO 5: Configurar Variable de Entorno**

**Crear archivo `.env` en la raíz de `Front/`:**
```
REACT_APP_API_URL=http://localhost:8080
```

**Para producción:**
```
REACT_APP_API_URL=https://api.tudominio.com
```

---

## 🚀 Pasos para Poner en Operación

### **En el Backend:**

1. **Asegurar que la Base de Datos Oracle está corriendo**
   ```bash
   # Verificar conexión
   sqlplus DRHIAISHNA/Drhiaishna16@localhost:1521/XEPDB1
   ```

2. **Compilar y ejecutar el Backend**
   ```bash
   cd Back
   mvn clean package
   mvn spring-boot:run
   # O usar Docker
   docker-compose up
   ```

3. **Verificar que Backend está corriendo**
   - Abrir: `http://localhost:8080/hello-world`
   - Debe retornar un saludo

### **En el Frontend:**

1. **Instalar dependencias**
   ```bash
   cd Front
   npm install
   ```

2. **Crear archivo `.env`**
   ```bash
   echo "REACT_APP_API_URL=http://localhost:8080" > .env
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Verificar conexión en la consola**
   - Abrir DevTools (F12)
   - En la pestaña Network, ver las peticiones a `http://localhost:8080`

---

## ✅ Checklist de Implementación

- [ ] Backend corriendo en `http://localhost:8080`
- [ ] Base de datos Oracle conectada
- [ ] Frontend con `.env` configurado
- [ ] Archivo `axiosConfig.js` actualizado
- [ ] Todos los servicios actualizados
- [ ] CORS habilitado en Backend
- [ ] Variables de entorno en Frontend
- [ ] Pruebas manuales en Postman o similar
- [ ] Verificar Network tab en DevTools
- [ ] Autenticación Firebase funcionando
- [ ] Tokens siendo enviados correctamente

---

## 🧪 Pruebas Rápidas

### **Prueba 1: Verificar Backend**
```bash
curl http://localhost:8080/hello-world
```

### **Prueba 2: Listar Productos (desde Frontend)**
```javascript
// En la consola del navegador
import api from './src/api/axiosConfig';
api.get('/api/productos').then(r => console.log(r.data));
```

### **Prueba 3: Crear Usuario**
```javascript
api.post('/api/usuarios', {
  nombre: "Test User",
  email: "test@example.com"
}).then(r => console.log(r.data));
```

---

## 📚 Documentación de Referencia

- **Spring Boot**: https://spring.io/projects/spring-boot
- **Axios**: https://axios-http.com/
- **CORS**: https://developer.mozilla.org/es/docs/Web/HTTP/CORS
- **Firebase Auth**: https://firebase.google.com/docs/auth

---

## 🆘 Troubleshooting

### **Error: CORS blocked**
- Verificar que Backend tiene `@CrossOrigin`
- Verificar `REACT_APP_API_URL` en `.env`

### **Error: 401 Unauthorized**
- Firebase token no está siendo enviado
- Verificar que Firebase está inicializado en Frontend
- Revisar interceptor de Axios

### **Backend no responde**
- Verificar que está corriendo en puerto 8080
- Verificar conexión a Base de Datos Oracle
- Ver logs: `mvn spring-boot:run`

### **Productos/Servicios no cargan**
- F12 → Network → ver petición a `/api/productos`
- Verificar que retorna 200 OK
- Revisar estructura de datos esperada en componentes

---

## 📞 Soporte

Si encuentras problemas, verifica:
1. Logs del Backend: `mvn spring-boot:run`
2. DevTools del Frontend: F12 → Console y Network
3. Mensajes de error específicos en la red
