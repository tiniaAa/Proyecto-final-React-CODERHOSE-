import { IoMdCart } from "react-icons/io";
import Badge from 'react-bootstrap/Badge';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
const CartWidget = () => {
    const {cart,cantidadCarrito} = useContext(CartContext);
    console.log(cart);
    return (
        <div className="position-relative d-inline-block">
            <IoMdCart size={28} />
            {cart.length >0 && <Badge className="badge" bg="danger position-absolute top-0 start-100 translate-middle rounded-pill">{cantidadCarrito()}</Badge> }
        </div>
    )
}

export default CartWidget;