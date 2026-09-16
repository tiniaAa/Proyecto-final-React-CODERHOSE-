import { Container, Row, Col } from 'react-bootstrap';
import AdminModificarItem from './AdminModificarItem';

const AdminModificarList = ({ productos, onSeleccionar }) => {
    return (
        <Container className="px-0 my-4">
            <Row className="g-4">
                {productos.map((producto) => (
                    <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                        <AdminModificarItem producto={producto} onSeleccionar={onSeleccionar} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AdminModificarList;