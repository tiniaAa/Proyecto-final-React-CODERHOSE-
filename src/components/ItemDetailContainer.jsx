import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { useUnProducto } from "../hooks/useUnProducto"; // Ajustá tu ruta si es distinta

const ItemDetailContainer = () => {
    const { id } = useParams(); 
    const { producto, loading, error } = useUnProducto(id); 
    
    
    if (error) { return <h1>{error.message}</h1>; }
    if (loading) { return <h1>Cargando Producto...</h1>; }
    
    return(
        <>
            <ItemDetail producto={producto} />
        </>
    )
}

export default ItemDetailContainer;