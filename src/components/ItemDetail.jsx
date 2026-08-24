import { useContext, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importante para la navegación
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ producto }) => {
    const [comprado, setComprado] = useState(false);
    
    // Extraemos las funciones del contexto
    const { agregar, cantidadItem } = useContext(CartContext);

    // Lógica estricta de stock
    const cantidadEnCarrito = cantidadItem(producto.id);
    const stockDisponible = producto.stock - cantidadEnCarrito;

    const onAdd = (cantidad) => {
        agregar(producto, cantidad);
        setComprado(true); // Al comprar, cambia el estado a true y oculta el ItemCount
    };

    return (
        <Container className="my-5">
            <Row className="gx-5">
                
                {/* COLUMNA IZQUIERDA: Imagen del producto */}
                <Col xs={12} md={7} className="text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
                    <Image 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        fluid 
                        rounded
                        style={{ maxHeight: "550px", objectFit: "contain" }} 
                    />
                </Col>

                {/* COLUMNA DERECHA: Panel de compra estilo ML */}
                <Col xs={12} md={5}>
                    <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column">
                        <span className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
                            Nuevo | {producto.categoria || "Catálogo"}
                        </span>
                        
                        <h3 className="fw-bold mb-3">{producto.nombre}</h3>
                        
                        <h2 className="display-6 fw-normal mb-4">${producto.precio}</h2>

                        <div className="mb-4">
                            <h6 className="fw-bold mb-3">Lo que tenés que saber de este producto</h6>
                            <ul className="text-muted" style={{ fontSize: "0.95rem", paddingLeft: "1.2rem" }}>
                                <li className="mb-2">{producto.descripcion}</li>
                                <li className="mb-2">Categoría: {producto.categoria}</li>
                                <li className="mb-2">Devolución gratis. Tenés 30 días desde que lo recibís.</li>
                            </ul>
                        </div>

                        <hr className="my-4" />

                        {/* Bloque inferior: Stock y controles condicionales */}
                        <div className="mt-auto">
                            <p className="mb-3">
                                <strong className="text-dark">Stock disponible:</strong> {stockDisponible} unidades
                            </p>
                            
                            {/* Lógica condicional: Si no compró muestra ItemCount, si compró muestra los botones de navegación */}
                            {!comprado ? (
                                <ItemCount stock={stockDisponible} onAdd={onAdd} />
                            ) : (
                                <div className="d-grid gap-2">
                                    <Button as={Link} to="/cart" variant="dark" className="py-2">
                                        Ir al carrito
                                    </Button>
                                    <Button as={Link} to="/" variant="outline-secondary" className="py-2">
                                        Volver al catálogo
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