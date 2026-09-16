import { useEffect, useState } from "react";
import { getProductos } from "../services/productos";

// Agregamos isAdmin con valor por defecto false
export const useProductos = (type, isAdmin = false) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    const refetch = () => {
        setTrigger(prev => prev + 1);
    };

    useEffect(() => {
        let isMounted = true;
        setLoading(true); 
        
        // Le pasamos el isAdmin al servicio
        getProductos(type, isAdmin)
            .then(data => {
                if (isMounted) {
                    setProductos(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });
            
        return () => {
            isMounted = false;
        };
    // El useEffect reacciona si cambia el tipo, el trigger o el rol
    }, [type, trigger, isAdmin]); 

    return { productos, loading, error, refetch };
}