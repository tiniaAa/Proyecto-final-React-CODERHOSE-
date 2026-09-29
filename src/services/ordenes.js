const API_URL = `${import.meta.env.VITE_API_URL}/ordenes`;

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
        const texto = await response.text();
        let mensaje = texto;
        try {
            mensaje = JSON.parse(texto).message || texto;
        } catch {
            // era texto plano, lo dejamos como vino
        }
        throw new Error(mensaje || "Ocurrió un error al procesar la orden en el servidor.");
    }

    return response.json();
}

// GET: costo del envío a domicilio (lo define el backend). Devuelve { costoEnvio }
export const getCostoEnvio = async () => {
    const response = await fetch(`${API_URL}/costo-envio`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el costo de envío.");
    }
    return response.json();
}