import { useState } from 'react';
import { createProducto, updateProducto, deleteProducto, restoreProducto } from '../services/productos';
export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 
    const ejecutarAccion = async (datos, accion) => {
        setLoading(true);
        setError(null);
        setSuccess(null); 
        try {
            if (accion === 'crear') {
                const payload = {
                    nombre: datos.nombre,
                    precio: parseFloat(datos.precio),
                    categoria: datos.categoria,
                    descripcion: datos.descripcion,
                    rutasImagenes: datos.rutasImagenes,
                    // ACA MANDAMOS EL ARREGLO AL BACKEND
                    variaciones: datos.variaciones.map(v => ({
                        talle: v.talle,
                        color: v.color,
                        stock: parseInt(v.stock, 10),
                        activo: true
                    }))
                };
                
                await createProducto(payload);
                setSuccess("¡Producto guardado exitosamente en el catálogo!");
                
            } else if (accion === 'actualizar') {
                const payload = {
                    nombre: datos.nombre,
                    precio: parseFloat(datos.precio),
                    categoria: datos.categoria,
                    descripcion: datos.descripcion,
                    rutasImagenes: datos.rutasImagenes,
                    variaciones: datos.variaciones.map(v => ({
                        id: v.id, // Si ya existía, mandamos el ID para que el back la actualice
                        talle: v.talle,
                        color: v.color,
                        stock: parseInt(v.stock, 10),
                        activo: true
                    }))
                };
                
                await updateProducto(datos.id, payload);
                setSuccess(`¡"${datos.nombre}" fue modificado con éxito!`);
                
            } else if (accion === 'eliminar') {
                await deleteProducto(datos);
                setSuccess("El producto fue dado de baja (Inactivo).");
                
            } else if (accion === 'restaurar') {
                await restoreProducto(datos);
                setSuccess("¡El producto fue restaurado y vuelve a estar visible en el catálogo público!");
            }       
            
        } catch (err) {
            setError(err.message);
            return false; 
        } finally {
            setLoading(false);
        }
        
        return true;
    };
    return { ejecutarAccion, loading, error, success };
};