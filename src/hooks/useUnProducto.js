import { useEffect, useState } from "react";
import { getOneProductos } from "../services/productos"; 

export const useUnProducto = (id) => {
    const [producto, setProducto] = useState(null); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        
        getOneProductos(id)
            .then(data => {
                setProducto(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);
    return { producto, loading, error };
}