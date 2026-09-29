import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Badge } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { uploadToCloudinary } from '../services/cloudinary'; 

const AdminModificar = ({ productoInicial, onActualizarProducto, onEliminarProducto, onRestaurarProducto }) => {
    
    const [producto, setProducto] = useState({ ...productoInicial });
    
    // Arrays para manejar las imágenes
    const [imagenesExistentes, setImagenesExistentes] = useState(productoInicial.rutasImagenes || []);
    const [imagenesArchivos, setImagenesArchivos] = useState([]);
    const [subiendoFotos, setSubiendoFotos] = useState(false);
    
    const [variaciones, setVariaciones] = useState(
        productoInicial.variaciones && productoInicial.variaciones.length > 0 
            ? [...productoInicial.variaciones] 
            : [{ talle: '', color: '', stock: '' }]
    );

    useEffect(() => {
        setProducto({ ...productoInicial });
        setImagenesExistentes(productoInicial.rutasImagenes || []);
        setImagenesArchivos([]); // Reseteamos selección
        setVariaciones(
            productoInicial.variaciones && productoInicial.variaciones.length > 0 
                ? [...productoInicial.variaciones] 
                : [{ talle: '', color: '', stock: '' }]
        );
    }, [productoInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleFileChange = (e) => {
        setImagenesArchivos(Array.from(e.target.files));
    };

    const quitarImagenExistente = (index) => {
        const nuevas = [...imagenesExistentes];
        nuevas.splice(index, 1);
        setImagenesExistentes(nuevas);
    };

    const handleVariacionChange = (index, field, value) => {
        const nuevas = [...variaciones];
        nuevas[index][field] = value;
        setVariaciones(nuevas);
    };

    const agregarVariacion = () => {
        setVariaciones([...variaciones, { talle: '', color: '', stock: '' }]);
    };

    const quitarVariacion = (index) => {
        const nuevas = [...variaciones];
        nuevas.splice(index, 1);
        setVariaciones(nuevas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (imagenesExistentes.length === 0 && imagenesArchivos.length === 0) {
            alert("Debes dejar al menos una imagen existente o subir una nueva.");
            return;
        }

        setSubiendoFotos(true);

        try {
            // Subimos SOLO las fotos nuevas a Cloudinary
            const promesasSubida = imagenesArchivos.map(file => uploadToCloudinary(file));
            const urlsNuevas = await Promise.all(promesasSubida);

            // Juntamos las que no borró con las recién subidas
            const urlsFinales = [...imagenesExistentes, ...urlsNuevas];

            await onActualizarProducto({ 
                ...producto, 
                rutasImagenes: urlsFinales, 
                variaciones 
            });

        } catch (error) {
            alert("Hubo un error al subir las nuevas fotos a Cloudinary.");
        } finally {
            setSubiendoFotos(false);
        }
    };

    return (
        <Container className="my-5">
            <Form onSubmit={handleSubmit}>
                <Row className="gx-5">
                    
                    {/* GESTOR DE IMÁGENES */}
                    <Col xs={12} md={5} className="mb-4">
                        <div className="p-3 border rounded bg-light mb-3">
                            <h6 className="fw-bold mb-3">Imágenes Actuales</h6>
                            {imagenesExistentes.length === 0 && <p className="text-muted small">No hay imágenes previas.</p>}
                            
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {imagenesExistentes.map((url, idx) => (
                                    <div key={idx} className="position-relative" style={{width: "80px", height: "80px"}}>
                                        <img src={url} alt={`img-${idx}`} className="w-100 h-100 object-fit-cover rounded border shadow-sm" />
                                        <Badge 
                                            bg="danger" 
                                            className="position-absolute top-0 start-100 translate-middle p-1" 
                                            style={{cursor: "pointer"}}
                                            onClick={() => quitarImagenExistente(idx)}
                                        >
                                            X
                                        </Badge>
                                    </div>
                                ))}
                            </div>

                            <Form.Group>
                                <Form.Label className="fw-semibold small">Agregar más fotos</Form.Label>
                                <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} size="sm" />
                                <Form.Text className="text-muted">
                                    {imagenesArchivos.length > 0 && `Agregando ${imagenesArchivos.length} fotos nuevas.`}
                                </Form.Text>
                            </Form.Group>
                        </div>
                    </Col>

                    {/* COLUMNA DERECHA: DATOS */}
                    <Col xs={12} md={7}>
                        <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column">
                            <Row>
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Categoría</Form.Label>
                                    <Form.Select name="categoria" value={producto.categoria} onChange={handleChange} size="sm">
                                        <option value="Conjunto">Conjunto</option>
                                        <option value="Pack">Pack</option>
                                        <option value="Elemento">Elemento</option>
                                    </Form.Select>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label className="fw-bold mb-1 small">Precio ($)</Form.Label>
                                    <Form.Control type="number" name="precio" value={producto.precio} onChange={handleChange} required size="sm" />
                                </Form.Group>
                            </Row>
                            
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold mb-1 small">Nombre del Producto</Form.Label>
                                <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} className="fw-bold fs-5" required />
                            </Form.Group>
                            
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold mb-1 small">Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} name="descripcion" value={producto.descripcion} onChange={handleChange} required />
                            </Form.Group>

                            <hr className="my-2" />
                            <h6 className="fw-bold mb-3 small text-muted">Talles y Colores Cargados</h6>
                            
                            {variaciones.map((v, index) => (
                                <Row key={index} className="mb-2 align-items-end g-2">
                                    <Form.Group as={Col} md="3">
                                        <Form.Label className="small mb-0 text-muted">Talle</Form.Label>
                                        <Form.Control type="text" size="sm" value={v.talle} onChange={(e) => handleVariacionChange(index, 'talle', e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label className="small mb-0 text-muted">Color</Form.Label>
                                        <Form.Control type="text" size="sm" value={v.color} onChange={(e) => handleVariacionChange(index, 'color', e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label className="small mb-0 text-muted">Stock</Form.Label>
                                        <Form.Control type="number" size="sm" min="0" value={v.stock} onChange={(e) => handleVariacionChange(index, 'stock', e.target.value)} required />
                                    </Form.Group>
                                    <Col md="2">
                                        {variaciones.length > 1 && (
                                            <Button variant="outline-danger" size="sm" onClick={() => quitarVariacion(index)} className="w-100">
                                                <BsTrash />
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            ))}
                            
                            <Button variant="outline-dark" size="sm" onClick={agregarVariacion} className="mt-2 mb-4 w-50">
                                + Agregar variación
                            </Button>

                            <hr className="my-3" />

                            <div className="d-grid gap-2 mt-auto">
                                <Button type="submit" variant="dark" className="py-2 shadow-sm" disabled={subiendoFotos}>
                                    {subiendoFotos ? <Spinner animation="border" size="sm" /> : "Guardar Cambios"}
                                </Button>
                                
                                {producto.activo ? (
                                    <Button type="button" variant="outline-danger" className="py-2" onClick={() => onEliminarProducto(producto.id)}>
                                        Dar de Baja (Ocultar del Catálogo)
                                    </Button>
                                ) : (
                                    <Button type="button" variant="success" className="py-2 shadow-sm fw-bold" onClick={() => onRestaurarProducto(producto.id)}>
                                        Restaurar Producto
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