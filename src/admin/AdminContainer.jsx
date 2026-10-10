import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminCrear from './AdminCrear';
import AdminModificarContainer from "./AdminModificarContainer"
import { useAdmin } from '../hooks/useAdmin';
import Swal from 'sweetalert2';

export const AdminContainer = () => {
    const [vistaActiva, setVistaActiva] = useState('crear');
    const { ejecutarAccion, loading, error, success } = useAdmin();

    useEffect(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        if (success) {
            Toast.fire({ icon: 'success', title: success });
        }
        if (error) {
            Toast.fire({ icon: 'error', title: error });
        }
    }, [success, error]);

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
            
            {loading ? (
                <Row className="mt-5">
                    <Col className="d-flex flex-column align-items-center">
                        <Spinner animation="grow" variant="dark" />
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