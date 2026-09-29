import { useState } from 'react';
import { createOrden } from '../services/ordenes';
import { crearPreferenciaPago } from '../services/mercadoPago';

export const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const procesarOrden = async (comprador, cart) => {
        setLoading(true);
        setError(null);

        const payload = {
            compradorNombre: comprador.nombre,
            compradorApellido: comprador.apellido,
            compradorEmail: comprador.email,
            compradorDireccion: comprador.direccion,
            compradorCiudad: comprador.ciudad,
            compradorCp: comprador.codigoPostal,
            compradorProvincia: comprador.provincia,
            tipoEnvio: comprador.tipoEnvio,
            metodoPago: comprador.metodoPago, // <--- ENVIAMOS EL MÉTODO
            compradorTelefono: comprador.telefono,
            items: cart.map(item => ({
                variacionId: item.variacion.id, // <--- ENVIAMOS VARIACIÓN
                cantidad: item.cantidad
            }))
        };

        try {
            const data = await createOrden(payload);
            return { success: true, id: data.id, error: null };
        } catch (err) {
            setError(err.message);
            return { success: false, id: null, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const pagarConMercadoPago = async (idOrden) => {
        setLoading(true);
        setError(null);

        try {
            const data = await crearPreferenciaPago(idOrden);
            if (!data?.url) {
                throw new Error("Mercado Pago no devolvió el link de pago.");
            }
            window.location.href = data.url;
            return { success: true, error: null };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    };

    return { procesarOrden, pagarConMercadoPago, loading, error };
};