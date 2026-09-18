// CORRECCIÓN: Apuntamos al puerto 8080 de Spring Boot
const API_URL = "http://localhost:8080/api/productos";

// Helper para obtener el token guardado en el LocalStorage
const getToken = () => localStorage.getItem('token');

export const getOneProductos = (id) => {
    const url = `${API_URL}/${id}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) throw new Error("Producto no encontrado en la base de datos");
                throw new Error("Error en el servidor");
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error("Error al obtener el producto: " + error.message);
        });
}

// GET: Obtener todos (Admin) o filtrar por categoría (Público)
export const getProductos = (type, isAdmin = false) => {
    let url = API_URL;
    const headers = {};
    
    if (isAdmin) {
        url = `${API_URL}/admin/todos`;
        // Si es admin, inyectamos el token
        const token = getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
    } else if (type) {
        url = `${API_URL}?categoria=${type}`;
    }

    return fetch(url, { headers })
        .then((response) => {
            if (!response.ok) throw new Error("Error en la petición al backend");
            return response.json();
        })
        .then((data) => {
            return data.map(prod => ({
                ...prod,
                imagen: prod.rutaImagen
            }));
        });
}

// POST (Create): Nuevo producto
export const createProducto = (payload) => {
    return fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}` // Pase VIP
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) throw new Error("Ocurrió un error al intentar guardar en el servidor.");
        return response.json();
    });
}

// PUT (Update): Modificar un producto existente
export const updateProducto = (id, payload) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}` // Pase VIP
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar el producto en el servidor.");
        return response.json(); 
    });
}

// DELETE (Delete): Eliminar un producto
export const deleteProducto = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getToken()}` // Pase VIP
        }
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar el producto en el servidor.");
        return response.text().then(text => text ? JSON.parse(text) : { success: true });
    });
}

// PUT (Restore): Restaurar un producto inactivo
export const restoreProducto = (id) => {
    return fetch(`${API_URL}/${id}/restaurar`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${getToken()}` // Pase VIP
        }
    }).then(response => {
        if (!response.ok) throw new Error("Error al restaurar el producto en el servidor.");
        return response.text().then(text => text ? JSON.parse(text) : { success: true });
    });
}