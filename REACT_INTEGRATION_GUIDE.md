# 🔌 Guía de Integración para Componentes React

## Introducción

Una vez que los servicios están conectados al backend, los componentes React deben usar estas funciones de forma asincrónica. Este documento muestra patrones comunes.

---

## 📌 Patrón Básico: useEffect + useState

### Cargar datos al montar el componente

```javascript
import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/productsService';

export function ProductList() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setLoading(true);
                const data = await getProductos();
                setProductos(data);
            } catch (err) {
                setError(err.message);
                console.error('Error cargando productos:', err);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, []); // Array vacío = ejecutar una sola vez al montar

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Productos</h2>
            <ul>
                {productos.map(p => (
                    <li key={p.id}>{p.nombre} - ${p.precio}</li>
                ))}
            </ul>
        </div>
    );
}
```

---

## 🔄 Crear Nuevo Registro

### Formulario con POST

```javascript
import React, { useState } from 'react';
import { createProducto } from '../services/productsService';

export function CreateProductForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const nuevoProducto = await createProducto(formData);
            setSuccess(true);
            setFormData({ nombre: '', descripcion: '', precio: 0, stock: 0 });
            console.log('Producto creado:', nuevoProducto);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
            />
            <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={formData.precio}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Crear Producto'}
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Producto creado exitosamente!</p>}
        </form>
    );
}
```

---

## ✏️ Actualizar Registro

### Componente de edición

```javascript
import React, { useState, useEffect } from 'react';
import { getProductoById, updateProducto } from '../services/productsService';

export function EditProductForm({ id }) {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const data = await getProductoById(id);
                setFormData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        cargarProducto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await updateProducto(id, formData);
            alert('Producto actualizado exitosamente');
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!formData) return <div>Producto no encontrado</div>;

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
            />
            <input
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
            />
            <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
            />
            <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
            />
            <button type="submit" disabled={saving}>
                {saving ? 'Guardando...' : 'Actualizar'}
            </button>
        </form>
    );
}
```

---

## 🗑️ Eliminar Registro

### Botón con confirmación

```javascript
import React, { useState } from 'react';
import { deleteProducto } from '../services/productsService';

export function DeleteProductButton({ id, onSuccess }) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return;
        }

        try {
            setDeleting(true);
            await deleteProducto(id);
            onSuccess?.();
            alert('Producto eliminado exitosamente');
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <button 
                onClick={handleDelete} 
                disabled={deleting}
                className="btn-danger"
            >
                {deleting ? 'Eliminando...' : 'Eliminar'}
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </>
    );
}
```

---

## 🎯 Hook Personalizado para Reducir Código

### useApi.js - Hook reutilizable

```javascript
import { useState, useEffect } from 'react';

export function useApi(apiCall, dependencies = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await apiCall();
                setData(result);
            } catch (err) {
                setError(err);
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
}
```

### Uso del hook personalizado

```javascript
import { useApi } from '../hooks/useApi';
import { getProductos } from '../services/productsService';

export function ProductList() {
    const { data: productos, loading, error } = useApi(getProductos);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {productos?.map(p => (
                <li key={p.id}>{p.nombre}</li>
            ))}
        </ul>
    );
}
```

---

## 🔄 Uso con Context (Estado Global)

### CartContext.js (Ejemplo existente mejorado)

```javascript
import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    const addToCart = useCallback((producto) => {
        setCart(prevCart => {
            const exists = prevCart.find(p => p.id === producto.id);
            if (exists) {
                return prevCart.map(p =>
                    p.id === producto.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prevCart, { ...producto, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart(prevCart => prevCart.filter(p => p.id !== productId));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        loading
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
```

---

## 🌐 Ejemplo: Página de Productos Completa

```javascript
import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productsService';

export function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0
    });

    // Cargar productos
    useEffect(() => {
        loadProductos();
    }, []);

    const loadProductos = async () => {
        try {
            setLoading(true);
            const data = await getProductos();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['precio', 'stock'].includes(name) ? parseFloat(value) : value
        }));
    };

    // Guardar (crear o actualizar)
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateProducto(editingId, formData);
            } else {
                await createProducto(formData);
            }
            setFormData({ nombre: '', descripcion: '', precio: 0, stock: 0 });
            setEditingId(null);
            setShowForm(false);
            loadProductos();
        } catch (err) {
            setError(err.message);
        }
    };

    // Editar
    const handleEdit = (producto) => {
        setFormData(producto);
        setEditingId(producto.id);
        setShowForm(true);
    };

    // Eliminar
    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este producto?')) return;
        try {
            await deleteProducto(id);
            loadProductos();
        } catch (err) {
            setError(err.message);
        }
    };

    // Cancelar edición
    const handleCancel = () => {
        setFormData({ nombre: '', descripcion: '', precio: 0, stock: 0 });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    return (
        <div className="container">
            <h1>Gestión de Productos</h1>
            
            {!showForm && (
                <button 
                    className="btn btn-primary mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Nuevo Producto
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSave} className="card p-4 mb-4">
                    <h3>{editingId ? 'Editar' : 'Crear'} Producto</h3>
                    
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control mb-2"
                        required
                    />
                    
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                    
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className="form-control mb-2"
                        step="0.01"
                        required
                    />
                    
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="form-control mb-2"
                        required
                    />
                    
                    <div>
                        <button type="submit" className="btn btn-success">
                            Guardar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-secondary ms-2"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>${p.precio}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(p)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

---

## 📋 Checklist para Componentes

Cuando conviertas un componente a usar APIs del backend:

- [ ] Importar el servicio adecuado
- [ ] Usar `useEffect` para cargar datos
- [ ] Agregar estados para `loading`, `error`, `data`
- [ ] Mostrar UI diferente según el estado (loading/error/datos)
- [ ] Manejar promesas con `async/await`
- [ ] Agregar `.catch()` o `try/catch` para errores
- [ ] Limpiar efectos si es necesario
- [ ] Mostrar mensajes de error al usuario
- [ ] Mostrar indicadores de carga

---

## 🚀 Próximos Pasos

1. **Actualizar todos los componentes** que usen datos
2. **Probar en DevTools** (Network tab)
3. **Implementar autenticación** si es necesaria
4. **Agregar validación** en formularios
5. **Mejorar manejo de errores**
6. **Agregar confirmaciones** antes de operaciones destructivas
