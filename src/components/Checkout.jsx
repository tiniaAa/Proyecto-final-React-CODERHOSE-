import { Form, Row, Col, Button } from "react-bootstrap";

const Checkout = ({ guardarComprador, irAResumen }) => {
    return (
        <Form onSubmit={irAResumen} className="p-4 rounded bg-light formulario">
            <h3 className="mb-4">Datos de Facturación y Envío</h3>
            
            <Row className="g-3 mb-3">
                <Form.Group as={Col} md={6} controlId="nombre">
                    <Form.Label className="fw-bold">Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder="Juan" required onChange={guardarComprador}/>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="apellido">
                    <Form.Label className="fw-bold">Apellido</Form.Label>
                    <Form.Control type="text" name="apellido" placeholder="Pérez" required onChange={guardarComprador}/>
                </Form.Group>
            </Row>
            
            <Form.Group className="mb-3" controlId="email">
                <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="tu_correo@ejemplo.com" 
                    required 
                    onChange={guardarComprador}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefono">
                <Form.Label className="fw-bold">Número de Teléfono</Form.Label>
                <Form.Control type="tel" name="telefono" placeholder="Ej: 11 2233 4455" required onChange={guardarComprador}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="direccion">
                <Form.Label className="fw-bold">Dirección</Form.Label>
                <Form.Control type="text" name="direccion" placeholder="Calle Falsa 123, Piso 1 Dpto B" required onChange={guardarComprador}/>
            </Form.Group>
            
            <Row className="g-3 mb-3">
                <Form.Group as={Col} md={5} controlId="provincia">
                    <Form.Label className="fw-bold">Provincia</Form.Label>
                    <Form.Control type="text" name="provincia" placeholder="Buenos Aires" required onChange={guardarComprador}/>
                </Form.Group>
                <Form.Group as={Col} md={4} controlId="ciudad">
                    <Form.Label className="fw-bold">Ciudad</Form.Label>
                    <Form.Control type="text" name="ciudad" placeholder="La Plata" required onChange={guardarComprador}/>
                </Form.Group>
                <Form.Group as={Col} md={3} controlId="codigoPostal">
                    <Form.Label className="fw-bold">Código Postal</Form.Label>
                    <Form.Control type="text" name="codigoPostal" placeholder="1900" required onChange={guardarComprador}/>
                </Form.Group>
            </Row>

            <Form.Group className="mb-4" controlId="tipoEnvio">
                <Form.Label className="fw-bold">Tipo de envío</Form.Label>
                <Form.Select name="tipoEnvio" required defaultValue="" onChange={guardarComprador}>
                    <option value="" disabled>Seleccioná una opción...</option>
                    <option value="domicilio">Envío a domicilio</option>
                    <option value="local">Retiro en el local</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="metodoPago">
                <Form.Label className="fw-bold">Método de Pago</Form.Label>
                <Form.Select name="metodoPago" required defaultValue="" onChange={guardarComprador}>
                    <option value="" disabled>Seleccioná cómo querés pagar...</option>
                    <option value="efectivo">Efectivo / Transferencia (Acordar con el vendedor)</option>
                    <option value="mercadopago">Mercado Pago (Tarjetas, RapiPago, Dinero en cuenta)</option>
                </Form.Select>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" type="submit" className="btn-continuar">
                    Revisar Resumen
                </Button>
            </div>
        </Form>
    );
};

export default Checkout;