import { useContext, useState } from "react";
import { Container, Row, Col, Image, Button, Form, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ producto }) => {
    const [comprado, setComprado] = useState(false);
    const [variacionId, setVariacionId] = useState("");
    
    const { agregar, cantidadItem } = useContext(CartContext);

    const variacionesActivas = producto.variaciones ? producto.variaciones.filter(v => v.activo) : [];
    const variacionSeleccionada = variacionesActivas.find(v => v.id.toString() === variacionId);
    
    const cantidadEnCarrito = variacionSeleccionada ? cantidadItem(variacionSeleccionada.id) : 0;
    const stockDisponible = variacionSeleccionada ? (variacionSeleccionada.stock - cantidadEnCarrito) : 0;
    
    const onAdd = (cantidad) => {
        if (!variacionSeleccionada) return;
        agregar(producto, variacionSeleccionada, cantidad); 
        setComprado(true);
    };

    // Array de imágenes para el carrusel
    const imagenes = (producto.rutasImagenes && producto.rutasImagenes.length > 0)
        ? producto.rutasImagenes
        : ["https://via.placeholder.com/600x600?text=Sin+Imagen"];

    return (
        <Container className="my-5">
            <Row className="gx-5">
                
                {/* CARRUSEL DE IMÁGENES */}
                <Col xs={12} md={7} className="text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
                    <Carousel className="w-100 shadow-sm rounded bg-white" data-bs-theme="dark">
                        {imagenes.map((url, idx) => (
                            <Carousel.Item key={idx}>
                                <Image 
                                    src={url} 
                                    alt={`${producto.nombre} - Foto ${idx+1}`} 
                                    fluid 
                                    className="d-block w-100"
                                    style={{ height: "550px", objectFit: "contain", backgroundColor: "#f8f9fa" }} 
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>

                {/* INFO DEL PRODUCTO */}
                <Col xs={12} md={5}>
                    <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column">
                        <span className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
                            Nuevo | {producto.categoria || "Catálogo"}
                        </span>
                        
                        <h3 className="fw-bold mb-3">{producto.nombre}</h3>
                        <h2 className="display-6 fw-normal mb-4">${producto.precio}</h2>
                        
                        <div className="mb-4">
                            <Form.Group>
                                <Form.Label className="fw-bold">Elegí talle y color:</Form.Label>
                                <Form.Select 
                                    value={variacionId} 
                                    onChange={(e) => {
                                        setVariacionId(e.target.value);
                                        setComprado(false); 
                                    }}
                                >
                                    <option value="" disabled>Seleccioná una opción...</option>
                                    {variacionesActivas.map(v => (
                                        <option key={v.id} value={v.id} disabled={v.stock === 0}>
                                            {v.talle} - {v.color} {v.stock === 0 ? "(Agotado)" : `(Stock: ${v.stock})`}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <hr className="my-4" />
                        <div className="mt-auto">
                            {variacionSeleccionada ? (
                                <p className="mb-3">
                                    <strong className="text-dark">Stock disponible:</strong> {stockDisponible} unidades
                                </p>
                            ) : (
                                <p className="mb-3 text-muted">Seleccioná una opción arriba para ver el stock.</p>
                            )}
                            
                            {!comprado ? (
                                (variacionSeleccionada && stockDisponible > 0) ? (
                                    <ItemCount stock={stockDisponible} onAdd={onAdd} />
                                ) : null
                            ) : (
                                <div className="d-grid gap-2">
                                    <Button as={Link} to="/carrito" variant="dark" className="py-2">
                                        Ir al carrito
                                    </Button>
                                    <Button as={Link} to="/catalogo" variant="outline-secondary" className="py-2">
                                        Seguir comprando
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default ItemDetail;