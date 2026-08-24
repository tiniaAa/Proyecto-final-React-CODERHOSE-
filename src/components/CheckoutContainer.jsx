import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { dataBase } from "../services/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import EmptyCart from "./EmptyCart";
import Checkout from "./Checkout";
import ResumeFinal from "./ResumeFinal";

const CheckoutContainer = () => {
    const { cart, vaciar, totalPago } = useContext(CartContext);
    const [comprador, setComprador] = useState({});
    const [paso, setPaso] = useState('formulario'); // Estados: 'formulario', 'resumen', 'finalizado'
    const [ordenId, setOrdenId] = useState('');
    const [loading, setLoading] = useState(false);

    // Actualiza el estado del comprador
    const guardarComprador = (e) => {
        setComprador({
            ...comprador,
            [e.target.name]: e.target.value
        });
    };

    // Avanza al resumen sin enviar a Firebase todavía
    const irAResumen = (evento) => {
        evento.preventDefault();
        setPaso('resumen');
    };

    // Ejecuta el guardado final en la base de datos
    const terminarCompra = () => {
        setLoading(true);
        const orden = {
            comprador: comprador,
            carrito: cart,
            total: totalPago(),
            fecha: serverTimestamp()
        };

        const orderCollection = collection(dataBase, 'orders');

        addDoc(orderCollection, orden)
            .then((res) => {
                setOrdenId(res.id);
                setPaso('finalizado');
                vaciar(); // Vaciamos el carrito SOLO cuando la compra se confirmó
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    // Retornos condicionales estrictos
    if (!cart.length && paso !== 'finalizado') {
        return <EmptyCart />;
    }

    if (paso === 'finalizado') {
        return (
            <div className="p-5 text-center mt-5 bg-light rounded">
                <h2>¡Compra confirmada!</h2>
                <p>Tu número de orden es: <strong className="text-success">{ordenId}</strong></p>
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
                loading={loading}
            />
        );
    }

    // Renderizado por defecto
    return (
        <Checkout 
            guardarComprador={guardarComprador} 
            irAResumen={irAResumen} 
        />
    );
};

export default CheckoutContainer;