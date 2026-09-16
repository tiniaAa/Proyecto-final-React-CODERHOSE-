const API_URL = "http://localhost:8081/api/ordenes";

// POST (Create): Enviar la orden al servidor
export const createOrden = async (payload) => {
    const response = await fetch(`${API_URL}/comprar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        // Atrapamos los mensajes de error que vengan de Java (ej: stock insuficiente)
        const errorData = await response.text();
        throw new Error(errorData || "Ocurrió un error al procesar la orden en el servidor.");
    }

    return response.json();
}