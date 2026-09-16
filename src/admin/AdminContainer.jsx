import { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminCrear from './AdminCrear';
import AdminModificarContainer from "./AdminModificarContainer"
import { useAdmin } from '../hooks/useAdmin';

export const AdminContainer = () => {
    // Estado para controlar qué módulo del dashboard estamos viendo
    const [vistaActiva, setVistaActiva] = useState('crear');

    // Cambiamos 'crearProducto' por algo genérico como 'ejecutarAccion'
    // Asumimos que 'success' ahora es un texto dinámico que viene del hook
    const { ejecutarAccion, loading, error, success } = useAdmin();

    return (
        <Container className="mt-5 mb-5">
            <Row className="mb-4 align-items-center">
                <Col xs={12} md={3} className="mb-3 mb-md-0">
                    <Button variant="outline-dark" as={Link} to="/">
                        ← Volver al Catálogo
                    </Button>
                </Col>
                <Col xs={12} md={6}>
                    <h2 className="text-center fw-bold admin-theme-text mb-0">
                        Panel de Administración
                    </h2>
                </Col>
                <Col xs={12} md={3}></Col>
            </Row>

            {/* Menú de Navegación Interna */}
            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <ButtonGroup className="shadow-sm">
                        <Button
                            variant={vistaActiva === 'crear' ? 'dark' : 'outline-dark'}
                            onClick={() => setVistaActiva('crear')}
                        >
                            Agregar Producto
                        </Button>
                        <Button
                            variant={vistaActiva === 'modificar' ? 'dark' : 'outline-dark'}
                            onClick={() => setVistaActiva('modificar')}
                        >
                            Modificar / Eliminar
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>

            {/* Sistema de feedback dinámico */}
            {error && (
                <Row className="mb-3">
                    <Col>
                        <Alert variant="danger" className="text-center fw-semibold shadow-sm">{error}</Alert>
                    </Col>
                </Row>
            )}
            
            {success && (
                <Row className="mb-3">
                    <Col>
                        <Alert variant="success" className="text-center fw-semibold shadow-sm">
                            {success} {/* Ahora renderiza el texto exacto que devuelva el hook */}
                        </Alert>
                    </Col>
                </Row>
            )}
            
            {/* Renderizado condicional: Spinner vs Vistas */}
            {loading ? (
                <Row className="mt-5">
                    <Col className="d-flex flex-column align-items-center">
                        <Spinner animation="border" role="status" variant="secondary" />
                        <span className="mt-3 fw-semibold admin-theme-text">Procesando solicitud...</span>
                    </Col>
                </Row>
            ) : (
                <>
                    {vistaActiva === 'crear' && <AdminCrear onGuardarProducto={(datos) => ejecutarAccion(datos, 'crear')} />}
                    {vistaActiva === 'modificar' && (
                        <AdminModificarContainer/>
                    )}
                </>
            )}
        </Container>
    );
}
export default AdminContainer;