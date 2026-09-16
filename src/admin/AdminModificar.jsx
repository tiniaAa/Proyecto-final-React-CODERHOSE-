import { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

// Este componente asumimos que recibe un "producto" (para editar) y una función
const AdminModificar = ({ productoInicial, onActualizarProducto, onEliminarProducto, onRestaurarProducto }) => {
    
    // Estado interno para manejar los cambios antes de enviarlos
    const [producto, setProducto] = useState({ ...productoInicial });

    // Si cambia el producto seleccionado desde afuera, reseteamos el estado
    useEffect(() => {
        setProducto({ ...productoInicial });
    }, [productoInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleFileChange = (e) => {
        setProducto({ ...producto, imagenNueva: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onActualizarProducto(producto);
    };

    return (
        <Container className="my-5">
            <Form onSubmit={handleSubmit}>
                <Row className="gx-5">
                    
                    {/* COLUMNA IZQUIERDA: Imagen del producto y subida de nueva imagen */}
                    <Col xs={12} md={7} className="text-center mb-4 mb-md-0 d-flex flex-column align-items-center justify-content-center">
                        <Image 
                            src={producto.imagen} 
                            alt={producto.nombre} 
                            fluid 
                            rounded
                            className="shadow-sm mb-3"
                            style={{ maxHeight: "400px", objectFit: "contain" }} 
                        />
                        <Form.Group controlId="formImagenUpdate" className="w-75">
                            <Form.Label className="fw-semibold text-muted small">Cambiar Imagen (Opcional)</Form.Label>
                            <Form.Control type="file" name="imagenNueva" accept="image/*" onChange={handleFileChange} size="sm" />
                        </Form.Group>
                    </Col>

                    {/* COLUMNA DERECHA: Panel de edición (Reemplazando los datos estáticos por Inputs) */}
                    <Col xs={12} md={5}>
                        <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column">
                            
                            <Form.Group className="mb-2">
                                <Form.Label className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Categoría</Form.Label>
                                <Form.Select name="categoria" value={producto.categoria} onChange={handleChange} size="sm">
                                    <option value="Conjunto">Conjunto</option>
                                    <option value="Pack">Pack</option>
                                    <option value="Elemento">Elemento</option>
                                </Form.Select>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-1 small">Nombre del Producto</Form.Label>
                                <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} className="fw-bold fs-5" required />
                            </Form.Group>
                            
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold mb-1 small">Precio ($)</Form.Label>
                                <Form.Control type="number" name="precio" value={producto.precio} onChange={handleChange} className="display-6 fs-3" required />
                            </Form.Group>

                            <div className="mb-4">
                                <h6 className="fw-bold mb-2">Lo que tenés que saber de este producto</h6>
                                <Form.Group>
                                    <Form.Control as="textarea" rows={4} name="descripcion" value={producto.descripcion} onChange={handleChange} required />
                                </Form.Group>
                            </div>

                            <hr className="my-3" />

                            {/* Bloque inferior: Stock y controles de guardado/eliminado */}
                            <div className="d-grid gap-2">
                                    <Button type="submit" variant="dark" className="py-2 shadow-sm">
                                        Guardar Cambios
                                    </Button>
                                    
                                    {/* Lógica dinámica de botones según el estado activo/inactivo */}
                                    {producto.activo ? (
                                        <Button 
                                            type="button" 
                                            variant="outline-danger" 
                                            className="py-2"
                                            onClick={() => onEliminarProducto(producto.id)}
                                        >
                                            Dar de Baja (Eliminar)
                                        </Button>
                                    ) : (
                                        <Button 
                                            type="button" 
                                            variant="success" 
                                            className="py-2 shadow-sm fw-bold"
                                            onClick={() => onRestaurarProducto(producto.id)}
                                        >
                                            Restaurar Producto al Catálogo
                                        </Button>
                                    )}
                                </div>
                            
                        </div>
                    </Col>
                    
                </Row>
            </Form>
        </Container>
    );
}

export default AdminModificar;