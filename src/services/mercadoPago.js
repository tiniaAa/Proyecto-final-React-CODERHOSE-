const API_URL = "http://localhost:8080/api/mercadopago";

export const crearPreferenciaPago = (idOrden) => {
    return fetch(`${API_URL}/crear-preferencia/${idOrden}`, {
        method: "POST"
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error al generar el link de pago con Mercado Pago.");
        }
        return response.json();
    });
}