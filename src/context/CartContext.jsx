import { createContext, useEffect, useState } from "react";
import Item from "../components/Item";

export const CartContext = createContext();

export const CartProvider =({children})=>{
    const [cart, setCart] = useState(() => {
        const carritoGuardado = localStorage.getItem("carrito_amma");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
    useEffect(() => {
        localStorage.setItem("carrito_amma", JSON.stringify(cart));
    }, [cart]);

    const agregar=(item,cant)=>{
        if(existeProducto(item.id)){
            setCart(cart.map((prod)=>{
                if(prod.id === item.id){
                    
                    return {...prod, cantidad: prod.cantidad + cant }
                }else{
                    return prod
                }}));
        }
        else{
            setCart([...cart, {...item, cantidad:cant}])
        }
    }
    const eliminar=(id)=>{
        setCart(cart.filter((prod)=> prod.id !== id))
    }
    const vaciar=()=>{
        setCart([])
    }
    const existeProducto=(id)=>{
        return cart.some((prod)=>prod.id===id)
    }

    const totalPago = () => {
    return cart.reduce((acumulador, prod) => acumulador + (prod.cantidad * prod.precio), 0);
}
    const cantidadCarrito=()=>{
        return cart.reduce((acumulador,prod)=>acumulador+=prod.cantidad,0)
    }

    const cantidadItem =(id)=>{
        const porductoCarrito = cart.find((prod)=>prod.id===id)
        if(porductoCarrito){
            return porductoCarrito.cantidad;
        }
        else{
            return 0;
        }
    }
    return(<>
        <CartContext.Provider value={{cart,agregar,eliminar,vaciar,totalPago,cantidadCarrito,cantidadItem}}>
            {children}
        </CartContext.Provider>
    </>)
}