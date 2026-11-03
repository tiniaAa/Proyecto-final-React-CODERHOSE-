import { Form, Row, Col, Button, Alert } from "react-bootstrap";
const Checkout = ({ comprador, errores, handleChange, irAResumen }) => {
    return (
        <Form onSubmit={irAResumen} noValidate className="p-4 rounded bg-light formulario shadow-sm">
            <h3 className="mb-4 fw-bold">Datos de Contacto y Entrega</h3>
            
            {/* NOMBRE Y APELLIDO */}
            <Row className="g-3 mb-3">
                <Form.Group as={Col} md={6} controlId="nombre">
                    <Form.Label className="fw-semibold">Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="nombre" 
                        placeholder="Juan" 
                        value={comprador.nombre}
                        onChange={handleChange}
                        isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="apellido">
                    <Form.Label className="fw-semibold">Apellido</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="apellido" 
                        placeholder="Pérez" 
                        value={comprador.apellido}
                        onChange={handleChange}
                        isInvalid={!!errores.apellido}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.apellido}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            
            {/* EMAIL Y TELÉFONO */}
            <Row className="g-3 mb-3">
                <Form.Group as={Col} md={6} controlId="email">
                    <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="tu_correo@ejemplo.com" 
                        value={comprador.email}
                        onChange={handleChange}
                        isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="telefono">
                    <Form.Label className="fw-semibold">Teléfono / WhatsApp</Form.Label>
                    <Form.Control 
                        type="tel" 
                        name="telefono" 
                        placeholder="Ej: 3421234567" 
                        value={comprador.telefono}
                        onChange={handleChange}
                        isInvalid={!!errores.telefono}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.telefono}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            {/* SELECCIÓN DE ENVÍO */}
            <Form.Group className="mb-3" controlId="tipoEnvio">
                <Form.Label className="fw-semibold">Tipo de entrega</Form.Label>
                <Form.Select 
                    name="tipoEnvio" 
                    value={comprador.tipoEnvio} 
                    onChange={handleChange}
                    isInvalid={!!errores.tipoEnvio}
                >
                    <option value="" disabled>Seleccioná una opción...</option>
                    <option value="domicilio">Envío a domicilio</option>
                    <option value="local">Retiro en el local (Laguna Paiva)</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errores.tipoEnvio}
                </Form.Control.Feedback>
            </Form.Group>
            {/* BLOQUE CONDICIONAL: RETIRO EN LOCAL */}
            {comprador.tipoEnvio === 'local' && (
                <Alert variant="info" className="mb-4">
                    <h6 className="fw-bold mb-1">📍 Punto de retiro:</h6>
                    <p className="mb-0 small">
                        Podés retirar tu pedido sin costo por nuestro punto de entrega en <strong>Moreno 1722, Laguna Paiva</strong>. Coordinaremos el horario tras confirmar la compra.
                    </p>
                </Alert>
            )}
            {/* BLOQUE CONDICIONAL: ENVÍO A DOMICILIO */}
            {comprador.tipoEnvio === 'domicilio' && (
                <div className="p-3 mb-4 bg-white rounded border border-light-subtle">
                    <h5 className="fw-semibold mb-3 fs-6 text-secondary">Dirección de Entrega</h5>
                    
                    <Form.Group className="mb-3" controlId="direccion">
                        <Form.Label className="small fw-semibold">Calle y Número (y Dpto/Piso si aplica)</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="direccion" 
                            placeholder="Ej: San Martín 1234, Piso 2 B" 
                            value={comprador.direccion}
                            onChange={handleChange}
                            isInvalid={!!errores.direccion}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errores.direccion}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Row className="g-3">
                        <Form.Group as={Col} md={5} controlId="provincia">
                            <Form.Label className="small fw-semibold">Provincia</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="provincia" 
                                placeholder="Santa Fe" 
                                value={comprador.provincia}
                                onChange={handleChange}
                                isInvalid={!!errores.provincia}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.provincia}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={4} controlId="ciudad">
                            <Form.Label className="small fw-semibold">Ciudad / Localidad</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="ciudad" 
                                placeholder="Santa Fe Capital" 
                                value={comprador.ciudad}
                                onChange={handleChange}
                                isInvalid={!!errores.ciudad}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.ciudad}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={3} controlId="codigoPostal">
                            <Form.Label className="small fw-semibold">Código Postal</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="codigoPostal" 
                                placeholder="3000" 
                                value={comprador.codigoPostal}
                                onChange={handleChange}
                                isInvalid={!!errores.codigoPostal}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.codigoPostal}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </div>
            )}
            {/* MÉTODO DE PAGO */}
            <Form.Group className="mb-4" controlId="metodoPago">
                <Form.Label className="fw-semibold">Método de Pago</Form.Label>
                <Form.Select 
                    name="metodoPago" 
                    value={comprador.metodoPago} 
                    onChange={handleChange}
                    isInvalid={!!errores.metodoPago}
                >
                    <option value="" disabled>Seleccioná cómo querés pagar...</option>
                    <option value="efectivo">Efectivo (Acordar con el vendedor)</option>
                    <option value="mercadopago">Mercado Pago (Tarjetas, RapiPago, Dinero en cuenta)</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errores.metodoPago}
                </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" type="submit" className="btn-continuar py-2 fw-semibold">
                    Revisar Resumen
                </Button>
            </div>
        </Form>
    );
};
export default Checkout