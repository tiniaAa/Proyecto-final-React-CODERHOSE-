import { Card, ListGroup, Row, Col, Button, Container } from 'react-bootstrap';

const ResumeFinal = ({ datosCliente, cart, totalPago, terminarCompra, volverAFormulario, loading, costoEnvio }) => {

    const esDomicilio = datosCliente.tipoEnvio === 'domicilio';
    const cargandoEnvio = esDomicilio && costoEnvio === null;

    const costoDeEnvio = esDomicilio ? (costoEnvio ?? 0) : 0;
    const totalDefinitivo = totalPago() + costoDeEnvio;

    return (
        <Container className="py-4 d-flex justify-content-center">
            <Card className="w-100 rounded bg-white shadow-sm" style={{ maxWidth: '850px' }}>
                <Card.Header className="text-white bg-dark p-3 d-flex justify-content-between align-items-center">
                    <h4 className="m-0 font-family-cursiva">AMMA INTIMATES</h4>
                    <small className="text-light fw-bold">Resumen de Operación</small>
                </Card.Header>

                <Card.Body className="p-4">
                    <h5 className="text-uppercase fw-bold text-secondary mb-3" style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                        Artículos a llevar
                    </h5>

                    <ListGroup variant="flush" className="mb-4">
                        {cart.map((producto) => {
                            const vText = producto.variacion ? `${producto.variacion.talle} - ${producto.variacion.color}` : '';
                            const idKey = producto.variacion ? producto.variacion.id : producto.id;
                            
                            return (
                                <ListGroup.Item key={idKey} className="d-flex justify-content-between align-items-center px-0 py-2">
                                    <div>
                                        <h6 className="my-0 fw-bold">{producto.nombre} {vText && `(${vText})`}</h6>
                                        <small className="text-muted">Cantidad: {producto.cantidad}</small>
                                    </div>
                                    <span className="fw-semibold text-dark">${producto.precio * producto.cantidad}</span>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>

                    <hr className="my-4" />

                    <h5 className="text-uppercase fw-bold text-secondary mb-3" style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                        Datos de entrega y facturación
                    </h5>

                    <div className="bg-light p-3 p-md-4 rounded mb-4 border border-light-subtle">
                        <Row className="g-4">
                            {/* COLUMNA 1: DATOS PERSONALES */}
                            <Col xs={12} md={6}>
                                <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Datos del Comprador</h6>
                                
                                <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95rem" }}>
                                    <div>
                                        <span className="text-secondary fw-semibold me-2">Nombre:</span>
                                        <span className="text-dark">{datosCliente.nombre} {datosCliente.apellido}</span>
                                    </div>
                                    <div>
                                        <span className="text-secondary fw-semibold me-2">Email:</span>
                                        <span className="text-dark">{datosCliente.email}</span>
                                    </div>
                                    <div>
                                        <span className="text-secondary fw-semibold me-2">Teléfono:</span>
                                        <span className="text-dark">{datosCliente.telefono}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="text-secondary fw-semibold me-2">Pago:</span>
                                        <span className="badge bg-dark">
                                            {datosCliente.metodoPago === 'mercadopago' ? 'Mercado Pago' : 'Efectivo '}
                                        </span>
                                    </div>
                                </div>
                            </Col>

                            {/* COLUMNA 2: MODALIDAD DE ENTREGA */}
                            <Col xs={12} md={6}>
                                <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Entrega</h6>
                                
                                <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95rem" }}>
                                    <div>
                                        <span className="text-secondary fw-semibold me-2">Modalidad:</span>
                                        <span className="fw-bold text-dark">
                                            {esDomicilio ? 'Envío a domicilio' : 'Retiro en el local'}
                                        </span>
                                    </div>
                                    {esDomicilio ? (
                                        <>
                                            <div>
                                                <span className="text-secondary fw-semibold me-2">Dirección:</span>
                                                <span className="text-dark">{datosCliente.direccion}</span>
                                            </div>
                                            <div>
                                                <span className="text-secondary fw-semibold me-2">Localidad:</span>
                                                <span className="text-dark">
                                                    {datosCliente.ciudad}, {datosCliente.provincia} ({datosCliente.codigoPostal})
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-3 bg-white rounded border small text-muted mt-2">
                                            📍 <strong>Punto de retiro:</strong> Moreno 1722, Laguna Paiva.
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="bg-light p-3 rounded border d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Subtotal productos:</span>
                            <span className="fw-semibold text-dark">${totalPago()}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Costo de envío:</span>
                            <span className="fw-semibold text-dark">{cargandoEnvio ? 'Calculando...' : `$${costoDeEnvio}`}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                            <span className="fw-bold fs-5 text-dark">Total definitivo:</span>
                            <strong className="fs-5 text-dark">{cargandoEnvio ? '...' : `$${totalDefinitivo}`}</strong>
                        </div>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <Button variant="dark" size="lg" onClick={terminarCompra} disabled={loading || cargandoEnvio}>
                            {loading ? 'Procesando compra...' : 'Finalizar Compra'}
                        </Button>
                        <Button variant="outline-secondary" size="md" onClick={volverAFormulario} disabled={loading}>
                            ← Modificar datos de entrega / pago
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ResumeFinal;