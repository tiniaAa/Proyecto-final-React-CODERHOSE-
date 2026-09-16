import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import EmptyCart from "./EmptyCart";
import Checkout from "./Checkout";
import ResumeFinal from "./ResumeFinal";
import { useCheckout } from "../hooks/useCheckout"; // <-- Importamos nuestro nuevo Hook

const CheckoutContainer = () => {
    const { cart, vaciar, totalPago } = useContext(CartContext);
    const [comprador, setComprador] = useState({});
    const [paso, setPaso] = useState('formulario'); 
    const [ordenId, setOrdenId] = useState('');
    
    // Extraemos las funciones y estados del hook
    const { procesarOrden, loading, error } = useCheckout();

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

    // La función ahora es súper cortita
    const terminarCompra = async () => {
        const resultado = await procesarOrden(comprador, cart);
        
        if (resultado.success) {
            setOrdenId(resultado.id);
            setPaso('finalizado');
            vaciar(); 
        } else {
            alert("Atención: " + error); // Opcional: podrías mostrar el error visualmente en vez de un alert
        }
    };

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
            <ResumeFinal 
                datosCliente={comprador} 
                cart={cart}
                totalPago={totalPago}
                terminarCompra={terminarCompra}
                loading={loading} // Pasamos el loading para bloquear el botón de compra
            />
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