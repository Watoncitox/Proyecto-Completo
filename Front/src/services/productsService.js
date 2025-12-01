import api from "../api/axiosConfig";
import imgP1 from "../app/assets/img/fondo/Productos/p1.jpg";
import imgP2 from "../app/assets/img/fondo/Productos/p2.jpg";
import imgP3 from "../app/assets/img/fondo/Productos/p3.jpg";

// ============================================
// FUNCIONES DE API REMOTA (Backend)
// ============================================

export const getProductos = async () => {
    try {
        const response = await api.get("/api/productos");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        // Fallback a localStorage si el API falla
        return getProductosNormalized();
    }
};

export const getProductoById = async (id) => {
    try {
        const response = await api.get(`/api/productos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo producto ${id}:`, error);
        return getProducto(id);
    }
};

export const createProducto = async (data) => {
    try {
        const response = await api.post("/api/productos", data);
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const updateProducto = async (id, data) => {
    try {
        const response = await api.put(`/api/productos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando producto ${id}:`, error);
        throw error;
    }
};

export const deleteProducto = async (id) => {
    try {
        await api.delete(`/api/productos/${id}`);
    } catch (error) {
        console.error(`Error eliminando producto ${id}:`, error);
        throw error;
    }
};

// ============================================
// FUNCIONES DE FALLBACK - LOCALSTORAGE
// ============================================

const KEY = "productos_v5";

function seed() {
	const exists = localStorage.getItem(KEY);
	if (!exists) {
		const initial = [
			{ id: "p1", nombre: "Crema Facial",     descripcion: "Hidratación diaria",    precio: 15990, imagen: imgP1, categoria: 'general', stock: 10, proveedor: 'Proveedor A', disponible: true },
			{ id: "p3", nombre: "Mascarilla Detox", descripcion: "Purifica y revitaliza", precio: 12990, imagen: imgP3, categoria: 'loreal', stock: 5, proveedor: 'Proveedor B', disponible: true },
			{ id: "p2", nombre: "Serum Capilar",    descripcion: "Reparación intensiva",  precio: 19990, imagen: imgP2, categoria: 'kerastase', stock: 8, proveedor: 'Proveedor C', disponible: true },
		];
		localStorage.setItem(KEY, JSON.stringify(initial));
		return;
	}
	try {
		const list = JSON.parse(exists);
		localStorage.setItem(KEY, JSON.stringify(list));
	} catch {
		localStorage.removeItem(KEY);
		seed();
	}
}

export function getProductosLocal() { seed(); return JSON.parse(localStorage.getItem(KEY)) || []; }
export function getProducto(id) { return getProductosLocal().find(p => p.id === id) || null; }
export function createProductoLocal(prod) { const l = getProductosLocal(); l.push(prod); localStorage.setItem(KEY, JSON.stringify(l)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} return prod; }
export function updateProductoLocal(id, patch) { const l = getProductosLocal().map(p => p.id===id?{...p,...patch}:p); localStorage.setItem(KEY, JSON.stringify(l)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} return l.find(p=>p.id===id); }
export function deleteProductoLocal(id) { const l = getProductosLocal().filter(p=>p.id!==id); localStorage.setItem(KEY, JSON.stringify(l)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} }

// Normalize/migrate existing products in localStorage so admin and client views match.
function normalizeProducts(list) {
	let changed = false;
	const normalized = (list || []).map((p) => {
		const copy = { ...p };
		// categoria heuristic
		if (typeof copy.categoria === 'undefined' || copy.categoria === null) {
			const name = String(copy.nombre || '').toLowerCase();
			const img = String(copy.imagen || '').toLowerCase();
			if (name.includes('kerastase') || img.includes('kerastase')) copy.categoria = 'kerastase';
			else if (name.includes("l'oreal") || name.includes('loreal') || img.includes('loreal')) copy.categoria = 'loreal';
			else copy.categoria = 'general';
			changed = true;
		}
		if (typeof copy.stock === 'undefined') { copy.stock = 0; changed = true; }
		if (typeof copy.proveedor === 'undefined') { copy.proveedor = ''; changed = true; }
		if (typeof copy.disponible === 'undefined') { copy.disponible = true; changed = true; }
		return copy;
	});
	if (changed) {
		try { localStorage.setItem(KEY, JSON.stringify(normalized)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} } catch(e) {}
	}
	return normalized;
}

// Expose a normalized read path used by UI (synchronous)
export function getProductosNormalized() { seed(); const raw = JSON.parse(localStorage.getItem(KEY)) || []; return normalizeProducts(raw); }







// LocalStorage fallback + normalization for UI code that expects synchronous access

const KEY = "productos_v5";

function seed() {
	const exists = localStorage.getItem(KEY);
	if (!exists) {
		const initial = [
			{ id: "p1", nombre: "Crema Facial",     descripcion: "Hidratación diaria",    precio: 15990, imagen: imgP1, categoria: 'general', stock: 10, proveedor: 'Proveedor A', disponible: true },
			{ id: "p3", nombre: "Mascarilla Detox", descripcion: "Purifica y revitaliza", precio: 12990, imagen: imgP3, categoria: 'loreal', stock: 5, proveedor: 'Proveedor B', disponible: true },
			{ id: "p2", nombre: "Serum Capilar",    descripcion: "Reparación intensiva",  precio: 19990, imagen: imgP2, categoria: 'kerastase', stock: 8, proveedor: 'Proveedor C', disponible: true },
		];
		localStorage.setItem(KEY, JSON.stringify(initial));
		return;
	}
	try {
		const list = JSON.parse(exists);
		localStorage.setItem(KEY, JSON.stringify(list));
	} catch {
		localStorage.removeItem(KEY);
		seed();
	}
}

export function getProductosLocal() { seed(); return JSON.parse(localStorage.getItem(KEY)) || []; }
export function getProducto(id) { return getProductosLocal().find(p => p.id === id) || null; }
export function createProductoLocal(prod) { const l = getProductosLocal(); l.push(prod); localStorage.setItem(KEY, JSON.stringify(l)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} return prod; }
export function updateProductoLocal(id, patch) { const l = getProductosLocal().map(p => p.id===id?{...p,...patch}:p); localStorage.setItem(KEY, JSON.stringify(l)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} return l.find(p=>p.id===id); }
export function deleteProductoLocal(id) { const l = getProductosLocal().filter(p=>p.id!==id); localStorage.setItem(KEY, JSON.stringify(l)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} }

// Normalize/migrate existing products in localStorage so admin and client views match.
function normalizeProducts(list) {
	let changed = false;
	const normalized = (list || []).map((p) => {
		const copy = { ...p };
		// categoria heuristic
		if (typeof copy.categoria === 'undefined' || copy.categoria === null) {
			const name = String(copy.nombre || '').toLowerCase();
			const img = String(copy.imagen || '').toLowerCase();
			if (name.includes('kerastase') || img.includes('kerastase')) copy.categoria = 'kerastase';
			else if (name.includes("l'oreal") || name.includes('loreal') || img.includes('loreal')) copy.categoria = 'loreal';
			else copy.categoria = 'general';
			changed = true;
		}
		if (typeof copy.stock === 'undefined') { copy.stock = 0; changed = true; }
		if (typeof copy.proveedor === 'undefined') { copy.proveedor = ''; changed = true; }
		if (typeof copy.disponible === 'undefined') { copy.disponible = true; changed = true; }
		return copy;
	});
	if (changed) {
		try { localStorage.setItem(KEY, JSON.stringify(normalized)); try{ window.dispatchEvent(new Event('productos:changed')); }catch{} } catch(e) {}
	}
	return normalized;
}

// Expose a normalized read path used by UI (synchronous)
export function getProductosNormalized() { seed(); const raw = JSON.parse(localStorage.getItem(KEY)) || []; return normalizeProducts(raw); }

