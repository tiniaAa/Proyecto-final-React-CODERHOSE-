import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "./firebaseConfig";


// services/productos.js
const API_URL = "http://localhost:8081/api/productos";

export const getProductos = (type) => {
    // Si más adelante agregamos el filtro en el backend, la URL sería:
    // const url = type ? `${API_URL}?categoria=${type}` : API_URL;
    const url = API_URL; 

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la petición al backend: " + response.statusText);
            }
            return response.json(); // Spring Boot ya nos devuelve el JSON limpio
        })
        .catch((error) => {
            throw new Error("Error al consultar Spring Boot: " + error.message);
        });
}

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
