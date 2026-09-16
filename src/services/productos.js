
const API_URL = "http://localhost:8081/api/productos";

export const getOneProductos = (id) => {
    // Nota: ¡Todavía tenemos que crear este endpoint en Spring Boot!
    // Asumiendo que será un GET a /api/productos/{id}
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
    
    // Decidimos qué endpoint de Spring Boot usar
    if (isAdmin) {
        url = `${API_URL}/admin/todos`;
    } else if (type) {
        url = `${API_URL}?categoria=${type}`;
    }

    return fetch(url)
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
        headers: { "Content-Type": "application/json" },
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
            "Content-Type": "application/json"
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
        method: "DELETE"
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar el producto en el servidor.");
        
        // El método DELETE suele devolver un 204 No Content (sin cuerpo). 
        // Verificamos si hay texto antes de intentar parsearlo a JSON para evitar errores.
        return response.text().then(text => text ? JSON.parse(text) : { success: true });
    });
}
// PUT (Restore): Restaurar un producto inactivo
export const restoreProducto = (id) => {
    return fetch(`${API_URL}/${id}/restaurar`, {
        method: "PUT"
    }).then(response => {
        if (!response.ok) throw new Error("Error al restaurar el producto en el servidor.");
        return response.text().then(text => text ? JSON.parse(text) : { success: true });
    });
}   

