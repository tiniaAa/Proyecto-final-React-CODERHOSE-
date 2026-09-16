import { useState } from 'react';
import { createProducto, updateProducto, deleteProducto, restoreProducto } from '../services/productos';

export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Ahora guarda strings dinámicos

    const ejecutarAccion = async (datos, accion) => {
        setLoading(true);
        setError(null);
        setSuccess(null); // Limpiamos mensajes anteriores

        try {
            if (accion === 'crear') {
                const payload = {
                    nombre: datos.nombre,
                    precio: parseFloat(datos.precio),
                    stock: parseInt(datos.stock, 10),
                    categoria: datos.categoria,
                    descripcion: datos.descripcion,
                    rutaImagen: datos.imagen ? `/img/${datos.imagen.name}` : ''
                };
                
                await createProducto(payload);
                setSuccess("¡Producto guardado exitosamente en el catálogo!");
                
            } else if (accion === 'actualizar') {
                const payload = {
                    nombre: datos.nombre,
                    precio: parseFloat(datos.precio),
                    stock: parseInt(datos.stock, 10),
                    categoria: datos.categoria,
                    descripcion: datos.descripcion,
                    // Si subió una imagen nueva, usamos esa. Si no, mantenemos la ruta original.
                    rutaImagen: datos.imagenNueva ? `/img/${datos.imagenNueva.name}` : datos.imagen
                };
                
                // datos incluye el id cuando viene del formulario de edición
                await updateProducto(datos.id, payload);
                setSuccess(`¡"${datos.nombre}" fue modificado con éxito!`);
                
            } else if (accion === 'eliminar') {
                await deleteProducto(datos);
                setSuccess("El producto fue dado de baja (Inactivo).");
                
            } else if (accion === 'restaurar') {
                // NUEVA LÓGICA DE RESTAURACIÓN
                await restoreProducto(datos);
                setSuccess("¡El producto fue restaurado y vuelve a estar visible en el catálogo público!");
            }       
            
        } catch (err) {
            setError(err.message);
            return false; // <-- Agregamos esto: Avisamos que falló
        } finally {
            setLoading(false);
        }
        
        return true;
    };

    return { ejecutarAccion, loading, error, success };
};