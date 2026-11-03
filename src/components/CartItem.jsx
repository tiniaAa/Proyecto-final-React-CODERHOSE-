import { BsTrash } from "react-icons/bs";
import { Row, Col, Button, Image } from "react-bootstrap";

const CartItem = ({ item, eliminar,sumarCantidad,restarCantidad }) => {
    const variacionText = item.variacion 
        ? `${item.variacion.talle} - ${item.variacion.color}` 
        : '';
        
    const idParaEliminar = item.variacion ? item.variacion.id : item.id;

    return (
        <Row className="align-items-center bg-white shadow-sm rounded p-3 mb-3 border">
            {/* FOTO */}
            <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                <Image 
                    src={item.rutasImagenes[0] } 
                    alt={item.nombre} 
                    fluid
                    rounded
                    style={{ maxHeight: "100px", objectFit: "contain" }}
                />
            </Col>
            
            {/* DATOS DEL PRODUCTO */}
            <Col xs={12} md={8}>
                <Row className="text-center text-md-start">
                    <Col xs={6} md={3} className="mb-2 mb-md-0">
                        <small className="text-muted fw-bold d-block">Producto</small>
                        <span className="fw-semibold">{item.nombre} 
                            {variacionText && <small className="d-block text-muted">{variacionText}</small>}
                        </span>
                    </Col>
                    <Col xs={6} md={3} className="mb-2 mb-md-0">
                        <small className="text-muted fw-bold d-block">Precio unidad</small>
                        <span>${item.precio}</span>
                    </Col>
                    {/* COLUMNA DE CANTIDAD */}
                    <Col xs={6} md={3} className="mb-2 mb-md-0">
                        <small className="text-muted fw-bold d-block mb-1">Cantidad</small>
                        
                        <div className="d-inline-flex align-items-center border rounded bg-light px-1">
                            <Button 
                                variant="link" size="sm" className="text-dark text-decoration-none px-2 py-0 fw-bold" onClick={() => restarCantidad(item.variacion.id)} disabled={item.cantidad <= 1} aria-label="Restar una unidad"> -
                            </Button>
                            <span className="fw-semibold px-2">{item.cantidad}</span>
                            <Button 
                                variant="link" size="sm" className="text-dark text-decoration-none px-2 py-0 fw-bold" onClick={() => sumarCantidad(item.variacion.id)} disabled={item.cantidad >= item.variacion.stock} aria-label="Sumar una unidad"> +
                            </Button>
                        </div>
                        {item.cantidad >= item.variacion.stock && (
                            <small className="text-danger d-block mt-1" style={{ fontSize: "0.75rem" }}>
                                Tope de stock
                            </small>
                        )}
                    </Col>
                    <Col xs={6} md={3}>
                        <small className="text-muted fw-bold d-block">Precio final</small>
                        <span className="text-success fw-bold">${item.precio * item.cantidad}</span>
                    </Col>
                </Row>
            </Col>

            {/* BOTÓN ELIMINAR */}
            <Col xs={12} md={2} className="text-center mt-3 mt-md-0">
                <Button variant="outline-danger" onClick={() => eliminar(idParaEliminar)} aria-label={`Eliminar ${item.nombre} del carrito`}>
                    <BsTrash size={20} />
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;