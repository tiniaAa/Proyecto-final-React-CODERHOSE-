import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Admin from './Admin';
import { useAdmin } from '../hooks/useAdmin';

export const AdminContainer = () => {
    const { crearProducto, loading, error, success } = useAdmin();

    return (
        <Container className="mt-5 mb-5">
            <Row className="mb-4 align-items-center">
                <Col xs={12} md={3} className="mb-3 mb-md-0">
                    <Button variant="outline-dark" as={Link} to="/">
                        ← Volver
                    </Button>
                </Col>
                <Col xs={12} md={6}>
                    <h2 className="text-center fw-bold admin-theme-text mb-0">
                        Panel de Administración
                    </h2>
                </Col>
                <Col xs={12} md={3}></Col>
            </Row>

            {/* Sistema de feedback mediante React-Bootstrap Alerts */}
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
                            ¡Producto guardado exitosamente en el catálogo!
                        </Alert>
                    </Col>
                </Row>
            )}
            
            {/* Renderizado condicional: Spinner vs Formulario */}
            {loading ? (
                <Row className="mt-5">
                    <Col className="d-flex flex-column align-items-center">
                        <Spinner animation="border" role="status" variant="secondary" />
                        <span className="mt-3 fw-semibold admin-theme-text">Procesando producto...</span>
                    </Col>
                </Row>
            ) : (
                <Admin onGuardarProducto={crearProducto} />
            )}
        </Container>
    );
}
export default AdminContainer;