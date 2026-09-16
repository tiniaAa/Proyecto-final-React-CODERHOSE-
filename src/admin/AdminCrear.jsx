import { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

// 1. Recibimos la función onGuardarProducto como prop desde el Contenedor
const AdminCrear = ({ onGuardarProducto }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        descripcion: '',
        imagen: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleFileChange = (e) => {
        setProducto({ ...producto, imagen: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 2. En lugar de solo loguear, le pasamos los datos al componente padre
        onGuardarProducto(producto);
    };

    return (
        <Card className="p-4 shadow-sm border-0 admin-theme-bg">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formNombre">
                        <Form.Label className="fw-semibold">Nombre del Producto</Form.Label>
                        <Form.Control type="text" name="nombre" placeholder="Ej: Conjunto Beige" onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="formPrecio">
                        <Form.Label className="fw-semibold">Precio ($)</Form.Label>
                        <Form.Control type="number" name="precio" placeholder="15000" onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="formStock">
                        <Form.Label className="fw-semibold">Stock</Form.Label>
                        <Form.Control type="number" name="stock" placeholder="5" onChange={handleChange} required />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formCategoria">
                        <Form.Label className="fw-semibold">Categoría</Form.Label>
                        <Form.Select name="categoria" onChange={handleChange} required>
                            <option value="">Selecciona una...</option>
                            <option value="Conjunto">Conjunto</option>
                            <option value="Pack">Pack</option>
                            <option value="Elemento">Elemento</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="formImagen">
                        <Form.Label className="fw-semibold">Subir Imagen</Form.Label>
                        <Form.Control type="file" name="imagen" accept="image/*" onChange={handleFileChange} required />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-4" controlId="formDescripcion">
                    <Form.Label className="fw-semibold">Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripcion" placeholder="Detalles del producto..." onChange={handleChange} required />
                </Form.Group>

                {/* Estructura nativa React-Bootstrap + Utilidades B5 en lugar de div crudo */}
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Button variant="dark" type="submit" size="lg" className="w-100 fw-bold shadow-sm">
                            Cargar Producto al Catálogo
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AdminCrear;