import { useState } from 'react';
import { Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { useProductos } from '../hooks/useProductos';
import AdminModificarList from './AdminModificarList';
import AdminModificar from './AdminModificar';
import { useAdmin } from '../hooks/useAdmin'; 

const AdminModificarContainer = () => {
    // 1. Extraemos la nueva función 'refetch' del hook
    // DESPUÉS (type = null, isAdmin = true)
const { productos, loading, error, refetch } = useProductos(null, true);   
    const { ejecutarAccion } = useAdmin(); 

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const handleActualizar = async (productoActualizado) => {
        const exito = await ejecutarAccion(productoActualizado, 'actualizar'); 
        if (exito) {
            refetch(); 
            setProductoSeleccionado(null); 
        }
    };

    const handleEliminar = async (idProducto) => {
        const exito = await ejecutarAccion(idProducto, 'eliminar');
        if (exito) {
            refetch(); 
            setProductoSeleccionado(null); 
        }
    };
    
    const handleRestaurar = async (idProducto) => {
        const exito = await ejecutarAccion(idProducto, 'restaurar');
        if (exito) {
            refetch(); 
            setProductoSeleccionado(null); 
        }
    };
    // Manejo de estados de carga y error iniciales
    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="mt-4">{error.message || "Error al cargar productos"}</Alert>;
    }

    return (
        <Container className="px-0 mt-4">
            {!productoSeleccionado ? (
                // VISTA A: Lista de productos
                <>
                    <h4 className="text-center admin-theme-text fw-bold mb-4">
                        Seleccioná un producto del catálogo para modificarlo
                    </h4>
                    <AdminModificarList productos={productos} onSeleccionar={setProductoSeleccionado} />
                </>
            ) : (
                // VISTA B: Formulario de edición
                <>
                    <Row className="mb-3">
                        <Col>
                            <Button variant="outline-secondary" size="sm" onClick={() => setProductoSeleccionado(null)}>
                                ← Cancelar y volver a la lista
                            </Button>
                        </Col>
                    </Row>
                    <AdminModificar 
                        productoInicial={productoSeleccionado} 
                        onActualizarProducto={handleActualizar}
                        onEliminarProducto={handleEliminar}
                        onRestaurarProducto={handleRestaurar} // <-- Nueva prop
                    />
                </>
            )}
        </Container>
    );
}

export default AdminModificarContainer;