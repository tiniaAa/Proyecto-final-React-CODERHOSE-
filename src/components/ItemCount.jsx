import { useState } from "react";

const ItemCount =({stock,onAdd})=>{
   
    const [count, setCount]= useState(1);
    const sumar = ()=> {
        if(count < stock){
            //modifico
            setCount(count + 1)
        }
    }
    const restar= ()=> {
        if(count > 0){

            setCount(count - 1)
        }
    }
   const purchase = ()=> {
        onAdd(count)
    }
    
    
   return (
    <div className="d-flex flex-column gap-3">
        {/* Controles de cantidad (Botones + - y número al medio estilo minimalista) */}
        <div className="d-flex align-items-center justify-content-between border rounded p-1 bg-light">
            <button 
                className="btn btn-sm btn-outline-dark px-3 border-0" 
                onClick={restar} 
                disabled={count === 0}
            >
                -
            </button>
            
            <span className="fw-semibold px-3 text-dark">{count}</span>
            
            <button 
                className="btn btn-sm btn-outline-dark px-3 border-0" 
                onClick={sumar} 
                disabled={count === stock} // Sugerencia: suele ser útil bloquear si llega al stock máximo
            >
                +
            </button>
        </div>

        {/* Botón principal de Comprar */}
        <button 
            className="btn btn-dark w-100 py-2 text-uppercase tracking-wider" 
            style={{ letterSpacing: "1px", fontSize: "0.9rem" }}
            disabled={count === 0 || stock === 0} 
            onClick={purchase}
        >
            Agregar al carrito
        </button>
    </div>
);
}
export default ItemCount;