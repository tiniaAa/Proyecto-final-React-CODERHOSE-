import { Container, Row, Col } from 'react-bootstrap';
import Item from "./Item";

const ItemList = ({productos}) => {
    return (
        // Reemplazamos el section container y el div row por los componentes de React-Bootstrap
        <Container className="my-5">
            <Row className="g-4">
                {productos.map((producto) => (
                    // El Col envuelve a la Card y define su comportamiento responsive
                    <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                        <Item producto={producto} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ItemList;