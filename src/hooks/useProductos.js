import { useEffect, useState } from "react";
// Se agrupan los imports en una sola línea
import { getProductos } from "../services/productos";

export const useProductos = (type) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        
        setLoading(true); 
        
        getProductos(type)
            .then(data => {
                if (isActive) {
                    setProductos(data);
                    setLoading(false);
                }
            })
            .catch(error => {
                if (isActive) {
                    setError(error);
                    setLoading(false);
                }
            });
        return () => {
            isActive = false;
        };
    }, [type]);

    return { productos, loading, error };
}