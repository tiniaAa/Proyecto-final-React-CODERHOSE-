import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap';

const ResumeFinal = ({ datosCliente, cart, totalPago, terminarCompra, loading }) => {
    
    // Cálculo dinámico dependiendo del input del formulario
    const costoDeEnvio = datosCliente.tipoEnvio === 'domicilio' ? 2500 : 0;
    const totalDefinitivo = totalPago() + costoDeEnvio;

    return (
        <Card className="w-90 rounded bg-white shadow-sm">
            <Card.Header className="text-white bg-dark p-3 d-flex justify-content-between align-items-center">
                <h4 className="m-0 font-family-cursiva">AMMA INTIMATES</h4>
                <small className="text-light fw-bold">Resumen de Operación</small>
            </Card.Header>

            <Card.Body className="p-4">
                <h5 className="text-uppercase fw-bold text-secondary mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
                    Artículos a llevar
                </h5>
                
                <ListGroup variant="flush" className="mb-4">
                    {cart.map((producto) => (
                        <ListGroup.Item key={producto.id} className="d-flex justify-content-between align-items-center px-0">
                            <div>
                                <h6 className="my-0 fw-bold">{producto.nombre}:</h6>
                                <small className="text-muted ms-3">Cantidad: {producto.cantidad}</small>
                            </div>
                            <span className="text-muted">${producto.precio * producto.cantidad}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                
                <hr className="my-4" />

                <h5 className="text-uppercase fw-bold text-secondary mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
                    Datos de entrega y facturación
                </h5>
                
                <Row className="g-3 mb-4 text-muted" style={{ fontSize: "0.95rem" }}>
                    <Col sm={5}>
                        <p className="mb-1">
                            <strong className="text-dark">Cliente:</strong> 
                            <span className="ms-1">{datosCliente.nombre} {datosCliente.apellido}</span>
                        </p>
                        <p className="mb-1">
                            <strong className="text-dark"> Destino:</strong> 
                            <span className="ms-1">{datosCliente.direccion}</span>
                        </p>
                    </Col>
                    <Col sm={7}>
                        <p className="mb-1">
                            <strong className="text-dark">Localidad: </strong> 
                            <span className="ms-1">{datosCliente.ciudad}, {datosCliente.provincia} ({datosCliente.codigoPostal})</span>
                        </p>
                        <p className="mb-1">
                            <strong className="text-dark"> Método de entrega:</strong> 
                            <span className="ms-1">{datosCliente.tipoEnvio === 'domicilio' ? 'Envío a domicilio' : 'Retiro en el local'}</span>
                        </p>
                    </Col>
                </Row>

                <hr className="my-4" />
                
                <div className="bg-light p-3 rounded border border-1 border-dark-subtle d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Subtotal productos: </span>
                        <span className="text-muted ms-1">${totalPago()}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Costo de envío: </span>
                        <span className="text-muted ms-1">${costoDeEnvio}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top border-dark-subtle">
                        <span className="fw-bold fs-5 text-dark">Total definitivo:</span>
                        <strong className="fs-5 text-dark ms-1">${totalDefinitivo}</strong>
                    </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                    {/* Al hacer clic acá, se dispara Firebase */}
                    <Button variant="dark" size="lg" onClick={terminarCompra} disabled={loading}>
                        {loading ? 'Procesando compra...' : 'Finalizar Compra'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ResumeFinal;