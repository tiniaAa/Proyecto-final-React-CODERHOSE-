const API_URL = `${import.meta.env.VITE_API_URL}/productos`;

// Helper para obtener el token
const getToken = () => sessionStorage.getItem('token');

// Función centralizada para manejar errores de autorización
const handleError = (response) => {
    if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem('token');
        window.location.reload(); // Obliga al front a redibujar el Login
        throw new Error("La sesión expiró. Volvé a iniciar sesión.");
    }
    if (!response.ok) {
        throw new Error("Ocurrió un error en el servidor.");
    }
}

export const getOneProductos = (id) => {
    const url = `${API_URL}/${id}`;

    return fetch(url)
        .then((response) => {
            if (response.status === 404) throw new Error("Producto no encontrado en la base de datos");
            handleError(response);
            return response.json();
        })
        .catch((error) => {
            throw new Error("Error al obtener el producto: " + error.message);
        });
}

export const getProductos = (type, isAdmin = false) => {
    let url = API_URL;
    const headers = {};
    
    if (isAdmin) {
        url = `${API_URL}/admin/todos`;
        const token = getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
    } else if (type) {
        url = `${API_URL}?categoria=${type}`;
    }

    return fetch(url, { headers })
        .then((response) => {
            handleError(response);
            return response.json();
        })
        .then((data) => {
            return data.map(prod => ({
                ...prod,
                imagen: prod.rutaImagen
            }));
        });
}

export const createProducto = (payload) => {
    return fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload)
    }).then(response => {
        handleError(response);
        return response.json();
    });
}

export const updateProducto = (id, payload) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload)
    }).then(response => {
        handleError(response);
        return response.json(); 
    });
}

export const deleteProducto = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }).then(response => {
        handleError(response);
        return response.text().then(text => text ? JSON.parse(text) : { success: true });
    });
}

export const restoreProducto = (id) => {
    return fetch(`${API_URL}/${id}/restaurar`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }).then(response => {
        handleError(response);
        return response.text().then(text => text ? JSON.parse(text) : { success: true });
    });
}