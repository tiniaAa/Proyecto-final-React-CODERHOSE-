import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider =({children})=>{
    const [cart, setCart] = useState(() => {
        const carritoGuardado = localStorage.getItem("carrito_amma");
        
        const parsed = carritoGuardado ? JSON.parse(carritoGuardado) : [];
        const carritoValido = parsed.every(p => p.variacion && p.variacion.id) ? parsed : [];
        return carritoValido;
    });

    useEffect(() => {
        localStorage.setItem("carrito_amma", JSON.stringify(cart));
    }, [cart]);

    // Ojo acá: ahora recibimos el item Y la variacionElegida
    const agregar = (item, variacion, cant) => {
        if (existeProducto(variacion.id)) {
            setCart(cart.map((prod) => {
                if(prod.variacion.id === variacion.id){
                    return {...prod, cantidad: prod.cantidad + cant }
                } else {
                    return prod
                }
            }));
        } else {
            setCart([...cart, {...item, variacion: variacion, cantidad: cant}])
        }
    }

    const eliminar = (variacionId) => {
        setCart(cart.filter((prod) => prod.variacion.id !== variacionId))
    }

    const vaciar = () => {
        setCart([])
    }

    const existeProducto = (variacionId) => {
        return cart.some((prod) => prod.variacion.id === variacionId)
    }

    const totalPago = () => {
        return cart.reduce((acumulador, prod) => acumulador + (prod.cantidad * prod.precio), 0);
    }

    const cantidadCarrito = () => {
        return cart.reduce((acumulador, prod) => acumulador += prod.cantidad, 0)
    }

    const cantidadItem = (variacionId) => {
        const productoCarrito = cart.find((prod) => prod.variacion.id === variacionId)
        return productoCarrito ? productoCarrito.cantidad : 0;
    }

    return(
        <CartContext.Provider value={{cart, agregar, eliminar, vaciar, totalPago, cantidadCarrito, cantidadItem}}>
            {children}
        </CartContext.Provider>
    )
}