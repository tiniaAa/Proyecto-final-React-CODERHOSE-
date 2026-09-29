import { useState } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs'; 
import { uploadToCloudinary } from '../services/cloudinary'; // Importamos tu nuevo servicio

const AdminCrear = ({ onGuardarProducto }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        categoria: '',
        descripcion: ''
    });

    // Guardamos los archivos seleccionados en un array
    const [imagenesArchivos, setImagenesArchivos] = useState([]);
    
    // Estado para deshabilitar el botón mientras se suben las fotos a la nube
    const [subiendoFotos, setSubiendoFotos] = useState(false);

    const [variaciones, setVariaciones] = useState([
        { talle: '', color: '', stock: '' }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleFileChange = (e) => {
        // Convertimos la selección en un Array real
        setImagenesArchivos(Array.from(e.target.files));
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
        
        if (imagenesArchivos.length === 0) {
            alert("Debes seleccionar al menos una imagen.");
            return;
        }

        setSubiendoFotos(true);

        try {
            // Disparamos la subida de todas las fotos a Cloudinary al mismo tiempo
            const promesasSubida = imagenesArchivos.map(file => uploadToCloudinary(file));
            
            // Esperamos a que Cloudinary nos devuelva todos los links
            const urlsCloudinary = await Promise.all(promesasSubida);

            // Armamos el paquete y se lo pasamos a la base de datos
            await onGuardarProducto({ 
                ...producto, 
                rutasImagenes: urlsCloudinary, 
                variaciones 
            });

        } catch (error) {
            alert("Fallo la subida a Cloudinary. Revisá la consola.");
        } finally {
            setSubiendoFotos(false);
        }
    };

    return (
        <Card className="p-4 shadow-sm border-0 admin-theme-bg">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label className="fw-semibold">Nombre del Producto</Form.Label>
                        <Form.Control type="text" name="nombre" placeholder="Ej: Conjunto Beige" onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label className="fw-semibold">Categoría</Form.Label>
                        <Form.Select name="categoria" onChange={handleChange} required>
                            <option value="">Selecciona una...</option>
                            <option value="Conjunto">Conjunto</option>
                            <option value="Pack">Pack</option>
                            <option value="Elemento">Elemento</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label className="fw-semibold">Precio Base ($)</Form.Label>
                        <Form.Control type="number" name="precio" placeholder="15000" onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label className="fw-semibold">Subir Imágenes (Puedes seleccionar varias)</Form.Label>
                        {/* El atributo 'multiple' te deja seleccionar más de una foto */}
                        <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} required />
                        <Form.Text className="text-muted">
                            {imagenesArchivos.length > 0 ? `Seleccionaste ${imagenesArchivos.length} imágenes.` : ''}
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripcion" placeholder="Detalles del producto..." onChange={handleChange} required />
                </Form.Group>

                <hr />
                <h5 className="fw-bold mb-3">Talles, Colores y Stock</h5>
                
                {variaciones.map((v, index) => (
                    <Row key={index} className="mb-3 align-items-end">
                        <Form.Group as={Col} md="3">
                            <Form.Label className="small text-muted">Talle (Ej: M, Único)</Form.Label>
                            <Form.Control type="text" placeholder="M" value={v.talle} onChange={(e) => handleVariacionChange(index, 'talle', e.target.value)} required />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label className="small text-muted">Color</Form.Label>
                            <Form.Control type="text" placeholder="Rojo, Beige" value={v.color} onChange={(e) => handleVariacionChange(index, 'color', e.target.value)} required />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label className="small text-muted">Stock</Form.Label>
                            <Form.Control type="number" placeholder="5" min="0" value={v.stock} onChange={(e) => handleVariacionChange(index, 'stock', e.target.value)} required />
                        </Form.Group>
                        <Col md="2">
                            {variaciones.length > 1 && (
                                <Button variant="outline-danger" onClick={() => quitarVariacion(index)} className="w-100">
                                    <BsTrash />
                                </Button>
                            )}
                        </Col>
                    </Row>
                ))}

                <Button variant="outline-dark" size="sm" onClick={agregarVariacion} className="mb-4">
                    + Agregar otra variación
                </Button>

                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Button 
                            variant="dark" 
                            type="submit" 
                            size="lg" 
                            className="w-100 fw-bold shadow-sm"
                            disabled={subiendoFotos}
                        >
                            {subiendoFotos ? (
                                <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/> Subiendo a Cloudinary...</>
                            ) : (
                                "Cargar Producto al Catálogo"
                            )}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AdminCrear;