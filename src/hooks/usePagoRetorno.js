import { useEffect, useState } from 'react';
import { confirmarPago, obtenerEstadoPago } from '../services/mercadoPago';

// Mercado Pago vuelve a /check?estado=exito&external_reference=ID&payment_id=XXX&...
const leerParametros = () => {
    const params = new URLSearchParams(window.location.search);
    const estado = params.get('estado');
    const ordenId = params.get('external_reference');
    const pid = params.get('payment_id') || params.get('collection_id');

    return {
        estado,
        ordenId,
        paymentId: pid && /^\d+$/.test(pid) ? pid : null,
        hayRetorno: Boolean(estado && ordenId && /^\d+$/.test(ordenId)),
    };
};

/**
 * Devuelve { vista, ordenId }
 * vista: null (no venimos de Mercado Pago) | 'verificando' | 'aprobado' | 'pendiente' | 'fallo' | 'error'
 *
 * No confiamos en ?estado=exito de la URL (cualquiera puede escribirlo):
 * el backend consulta el pago a Mercado Pago y nos dice el estado real.
 */
export const usePagoRetorno = () => {
    const [retorno] = useState(leerParametros);
    const [estadoPago, setEstadoPago] = useState(null);
    const [verificando, setVerificando] = useState(retorno.hayRetorno);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!retorno.hayRetorno) return;

        let cancelado = false;

        const verificar = async () => {
            try {
                // Con payment_id verificamos ese pago; sin él (ej: el usuario volvió sin pagar)
                // solo leemos el estado guardado de la orden.
                const data = retorno.paymentId
                    ? await confirmarPago(retorno.ordenId, retorno.paymentId)
                    : await obtenerEstadoPago(retorno.ordenId);
                if (!cancelado) setEstadoPago(data.estado);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setVerificando(false);
            }
        };

        verificar();
        return () => { cancelado = true; };
    }, [retorno]);

    let vista = null;
    if (retorno.hayRetorno) {
        if (verificando) vista = 'verificando';
        else if (error) vista = 'error';
        else if (estadoPago === 'PAGADO') vista = 'aprobado';
        else if (retorno.estado === 'fallo' || estadoPago === 'RECHAZADO') vista = 'fallo';
        else vista = 'pendiente';
    }

    return { vista, ordenId: retorno.ordenId };
};
