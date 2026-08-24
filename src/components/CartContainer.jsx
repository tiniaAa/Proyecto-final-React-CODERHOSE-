import { useContext } from "react";
import CartView from "./CartView";
import EmptyCart from "./EmptyCart"
import { CartContext } from "../context/CartContext";

const CartContainer = () => {
const {cart}= useContext(CartContext)
  return (
    <>
       {
        !cart.length 
        ? <EmptyCart/>
        : <CartView/>
       }
    </>
  )
}

export default CartContainer

