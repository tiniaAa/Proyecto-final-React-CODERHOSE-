import { BsTrash } from "react-icons/bs";
import { Row, Col, Button, Image } from "react-bootstrap";

const CartItem = ({ item, eliminar }) => {
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
                    <Col xs={6} md={3} className="mb-2 mb-md-0">
                        <small className="text-muted fw-bold d-block">Cantidad</small>
                        <span>{item.cantidad}</span>
                    </Col>
                    <Col xs={6} md={3}>
                        <small className="text-muted fw-bold d-block">Precio final</small>
                        <span className="text-success fw-bold">${item.precio * item.cantidad}</span>
                    </Col>
                </Row>
            </Col>

            {/* BOTÓN ELIMINAR */}
            <Col xs={12} md={2} className="text-center mt-3 mt-md-0">
                <Button variant="outline-danger" onClick={() => eliminar(idParaEliminar)}>
                    <BsTrash size={20} />
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;