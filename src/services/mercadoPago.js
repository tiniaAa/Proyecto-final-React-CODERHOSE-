const API_URL = `${import.meta.env.VITE_API_URL}/mercadopago`;

const request = async (path, options, mensajeError) => {
    const response = await fetch(`${API_URL}${path}`, options);
    if (!response.ok) {
        throw new Error(mensajeError);
    }
    return response.json();
};

// Devuelve { url } con el link de pago de Mercado Pago
export const crearPreferenciaPago = (idOrden) =>
    request(
        `/crear-preferencia/${idOrden}`,
        { method: "POST" },
        "Error al generar el link de pago con Mercado Pago."
    );

// El backend verifica el pago directo con Mercado Pago. Devuelve { estado }
export const confirmarPago = (ordenId, paymentId) =>
    request(
        "/confirmar-pago",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ordenId: Number(ordenId), paymentId: Number(paymentId) }),
        },
        "No se pudo verificar el pago."
    );

// Devuelve { estado }: PENDIENTE | PAGADO | RECHAZADO | REEMBOLSADO
export const obtenerEstadoPago = (idOrden) =>
    request(`/estado/${idOrden}`, {}, "No se pudo consultar el estado del pago.");
