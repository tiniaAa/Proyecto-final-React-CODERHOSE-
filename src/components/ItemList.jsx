import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Item from "./Item";
const ItemList = ({ productos }) => {
    // Si la categoría no tiene artículos disponibles
    if (!productos || productos.length === 0) {
        return (
            <Container className="my-5 text-center py-5">
                <div className="p-4 p-md-5 bg-light rounded shadow-sm mx-auto" style={{ maxWidth: '550px' }}>
                    <h4 className="fw-bold text-dark mb-3">No encontramos productos en esta categoría</h4>
                    <p className="text-muted mb-4">
                        Pronto estaremos sumando nuevos ingresos a esta sección. Te invitamos a recorrer todo nuestro catálogo disponible.
                    </p>
                    <Link to="/catalogo" className="btn btn-dark px-4 py-2">
                        Ver todo el catálogo
                    </Link>
                </div>
            </Container>
        );
    }
    return (
        <Container className="my-5">
            <Row className="g-4">
                {productos.map((producto) => (
                    <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                        <Item producto={producto} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default ItemList;