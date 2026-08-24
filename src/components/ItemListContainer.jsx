import { useParams } from "react-router-dom";
import {useProductos} from "../hooks/useProductos"
import ItemList from "./ItemList";
import LoadingComponent from "./LoadingComponent"
const ItemListContainer=({mensaje})=>{
    const {type} =useParams(); 
    const {productos,loading,error}= useProductos(type);   
    
    if(error){return <h1>{error.message}</h1>};
    if(loading){return <LoadingComponent text={type ?'Cargando categoría...' : 'Cargando productos...'}/>};
    const categoriaFormateada = type 
        ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() 
        : "";
    
    return(<>
        <h1 className="text-center my-4 fw-normal" style={{ letterSpacing: "1px" }}>
                {mensaje} {categoriaFormateada}
        </h1>
        <ItemList productos={productos}/>
    </>)
}
export default ItemListContainer;