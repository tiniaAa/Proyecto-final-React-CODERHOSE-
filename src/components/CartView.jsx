import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem"; 
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import EmptyCart from "./EmptyCart"; // Importamos tu vista de carrito vacío

const Cart = () => {
    const { cart, eliminar, vaciar, totalPago } = useContext(CartContext);

    return (
        <Container className="my-5">
            <h2 className="mb-4 fw-bold">Tu Carrito</h2>
            
            <Row>
                {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
                <Col lg={8}>
                    {cart.map((compra) => {
                        const keyId = compra.variacion ? compra.variacion.id : compra.id;
                        return (
                            <CartItem 
                                key={keyId} 
                                item={compra} 
                                eliminar={eliminar} 
                            />
                        )
                    })}
                </Col>

                {/* COLUMNA DERECHA: RESUMEN DE PAGO */}
                <Col lg={4}>
                    <Card className="shadow-sm border-0 bg-light p-4 sticky-top" style={{ top: "20px" }}>
                        <h4 className="fw-bold mb-4">Resumen</h4>
                        
                        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                            <span className="text-muted">Subtotal:</span>
                            <span className="fw-bold text-success fs-4">${totalPago()}</span>
                        </div>
                        
                        <div className="d-grid gap-3 mt-4">
                            <Link to={`/check`} className="btn btn-success btn-lg fw-bold shadow-sm">
                                Continuar Compra
                            </Link>
                            <Button variant="outline-danger" onClick={vaciar}>
                                Vaciar carrito
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;