import { useState } from 'react';

export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const crearProducto = async (datosFormulario) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Adaptamos los datos para que coincidan con el DTO de Spring Boot
            const payload = {
                nombre: datosFormulario.nombre,
                precio: parseFloat(datosFormulario.precio),
                stock: parseInt(datosFormulario.stock, 10),
                categoria: datosFormulario.categoria,
                descripcion: datosFormulario.descripcion,
                // Simulamos la ruta estática extrayendo el nombre del archivo
                rutaImagen: datosFormulario.imagen ? `/img/${datosFormulario.imagen.name}` : ''
            };

            const response = await fetch("http://localhost:8081/api/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Ocurrió un error al intentar guardar en el servidor.");
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { crearProducto, loading, error, success };
};