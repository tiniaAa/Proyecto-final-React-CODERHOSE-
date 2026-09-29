import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import EmptyCart from "./EmptyCart";
import Checkout from "./Checkout";
import ResumeFinal from "./ResumeFinal";
import { useCheckout } from "../hooks/useCheckout";
import { usePagoRetorno } from "../hooks/usePagoRetorno";
import { getCostoEnvio } from "../services/ordenes";

const CheckoutContainer = () => {
    const { cart, vaciar, totalPago } = useContext(CartContext);
    const [comprador, setComprador] = useState({});
    const [paso, setPaso] = useState('formulario');
    const [ordenId, setOrdenId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [costoEnvio, setCostoEnvio] = useState(null);

    const { procesarOrden, pagarConMercadoPago, loading } = useCheckout();

    // El costo de envío lo define el backend: lo pedimos para mostrar el mismo valor que se va a cobrar
    useEffect(() => {
        let cancelado = false;
        getCostoEnvio()
            .then((data) => { if (!cancelado) setCostoEnvio(Number(data.costoEnvio)); })
            .catch((err) => { if (!cancelado) setErrorMsg(err.message); });
        return () => { cancelado = true; };
    }, []);

    // Si venimos de Mercado Pago, esto verifica el pago con el backend
    const { vista, ordenId: ordenRetorno } = usePagoRetorno();

    // El carrito se vacía recién cuando el pago quedó aprobado o pendiente,
    // no antes de ir a Mercado Pago (si el pago falla, el cliente conserva su carrito).
    useEffect(() => {
        if (vista === 'aprobado' || vista === 'pendiente') {
            vaciar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vista]);

    const guardarComprador = (e) => {
        setComprador({
            ...comprador,
            [e.target.name]: e.target.value
        });
    };

    const irAResumen = (evento) => {
        evento.preventDefault();
        setPaso('resumen');
    };

    const terminarCompra = async () => {
        setErrorMsg('');

        // Si la orden ya se creó (ej: falló Mercado Pago y el cliente reintenta),
        // la reutilizamos en vez de crear otra.
        let id = ordenId;
        if (!id) {
            const resultado = await procesarOrden(comprador, cart);
            if (!resultado.success) {
                setErrorMsg(resultado.error);
                return;
            }
            id = resultado.id;
            setOrdenId(id);
        }

        if (comprador.metodoPago === 'mercadopago') {
            const pago = await pagarConMercadoPago(id);
            if (!pago.success) {
                setErrorMsg(pago.error);
            }
        } else {
            vaciar();
            setPaso('finalizado');
        }
    };

    const reintentarPago = async () => {
        setErrorMsg('');
        const pago = await pagarConMercadoPago(ordenRetorno);
        if (!pago.success) {
            setErrorMsg(pago.error);
        }
    };

    // ---------- Regreso desde Mercado Pago ----------
    if (vista) {
        const caja = "p-5 text-center mt-5 bg-light rounded shadow-sm";
        const numeroOrden = (
            <p className="fs-5">Tu número de orden es: <strong className="fs-4">{ordenRetorno}</strong></p>
        );

        switch (vista) {
            case 'verificando':
                return (
                    <div className={caja}>
                        <div className="spinner-border mb-3" role="status" />
                        <p className="fs-5 mb-0">Verificando tu pago...</p>
                    </div>
                );
            case 'aprobado':
                return (
                    <div className={caja}>
                        <h2 className="text-success mb-3">¡Pago aprobado!</h2>
                        {numeroOrden}
                    </div>
                );
            case 'pendiente':
                return (
                    <div className={caja}>
                        <h2 className="text-warning mb-3">Tu pago está pendiente</h2>
                        {numeroOrden}
                        <p>Apenas Mercado Pago lo acredite, vamos a confirmar tu compra.</p>
                    </div>
                );
            case 'fallo':
                return (
                    <div className={caja}>
                        <h2 className="text-danger mb-3">No se pudo completar el pago</h2>
                        {numeroOrden}
                        <p>No se realizó ningún cobro. Podés intentar de nuevo.</p>
                        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                        <button className="btn btn-dark" onClick={reintentarPago} disabled={loading}>
                            {loading ? "Redirigiendo..." : "Reintentar pago"}
                        </button>
                    </div>
                );
            default: // 'error'
                return (
                    <div className={caja}>
                        <h2 className="text-danger mb-3">No pudimos verificar tu pago</h2>
                        {numeroOrden}
                        <p>Si ya pagaste, tu compra queda registrada y te vamos a contactar. Guardá tu número de orden.</p>
                    </div>
                );
        }
    }

    // ---------- Flujo normal ----------
    if (!cart.length && paso !== 'finalizado') {
        return <EmptyCart />;
    }

    if (paso === 'finalizado') {
        return (
            <div className="p-5 text-center mt-5 bg-light rounded shadow-sm">
                <h2 className="text-success mb-3">¡Compra confirmada!</h2>
                <p className="fs-5">Tu número de orden es: <strong className="fs-4">{ordenId}</strong></p>
            </div>
        );
    }

    if (paso === 'resumen') {
        return (
            <>
                {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
                <ResumeFinal
                    datosCliente={comprador}
                    cart={cart}
                    totalPago={totalPago}
                    terminarCompra={terminarCompra}
                    loading={loading}
                    costoEnvio={costoEnvio}
                />
            </>
        );
    }

    return (
        <Checkout
            guardarComprador={guardarComprador}
            irAResumen={irAResumen}
        />
    );
};

export default CheckoutContainer;
