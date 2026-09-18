import { useState } from 'react';
import { createOrden } from '../services/ordenes';
import { crearPreferenciaPago } from '../services/mercadoPago';
export const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const procesarOrden = async (comprador, cart) => {
        setLoading(true);
        setError(null);

        // 1. Armamos el payload con los nombres exactos que espera tu DTO en Java
        const payload = {
            compradorNombre: comprador.nombre,
            compradorApellido: comprador.apellido,
            compradorEmail: comprador.email,
            compradorDireccion: comprador.direccion,
            compradorCiudad: comprador.ciudad,
            compradorCp: comprador.codigoPostal,
            compradorProvincia: comprador.provincia,
            tipoEnvio: comprador.tipoEnvio,
            compradorTelefono: comprador.telefono,
            
            // Mapeamos el carrito al formato de ItemCompraDto
            items: cart.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad
            }))
        };

        try {
            // 2. Llamamos al servicio
            const data = await createOrden(payload);
            // 3. Devolvemos el ID de la orden generada en PostgreSQL
            return { success: true, id: data.id };
        } catch (err) {
            setError(err.message);
            return { success: false, id: null };
        } finally {
            setLoading(false);
        }
    };
    

    const pagarConMercadoPago = async (idOrden) => {
        try {
            setLoading(true);
            setError(null);
            
            // Usamos el servicio puro
            const data = await crearPreferenciaPago(idOrden);
            
            // Redirigimos al usuario
            window.location.href = data.url; 
            
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    return { procesarOrden, pagarConMercadoPago, loading, error };
};