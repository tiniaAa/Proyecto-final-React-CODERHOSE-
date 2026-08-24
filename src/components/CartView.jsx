import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem"; // Importamos el nuevo componente
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, eliminar, vaciar, totalPago } = useContext(CartContext);

    return (
        <div className="contenedorCarrito">
            {/* Lista de ítems */}
            <div className="card-cont">
                {cart.map((compra) => (
                    <CartItem 
                        key={compra.id} 
                        item={compra} 
                        eliminar={eliminar} 
                    />
                ))}
            </div>

            {/* Controles de pago y vaciado */}
            <div className="contenedorControles">
                <div className="totalCarrito">
                    <p>Total a pagar: <span style={{ color: "#28a745" }}>$ {totalPago()}</span></p>
                    <Link to={`/check`} className="btn btnPagar">Pagar</Link>
                </div>
                
                <button className="vaciarCarrito" onClick={vaciar}>
                    Vaciar carrito
                </button>
            </div>
        </div>
    );
};

export default Cart;