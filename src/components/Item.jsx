import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
const Item = (props) => {
    const {agregar} = useContext(CartContext)
    
    return (
        
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={props.producto.imagen} />
            
            
            <Card.Body className="d-flex flex-column">
                <Card.Title>{props.producto.nombre}</Card.Title>
                <Card.Text>{props.producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold">${props.producto.precio}</Card.Text>
                
                                <Link to={`/productoDetalle/${props.producto.id}`} className='btn btn-primary m-3'>Ver mas</Link>
            </Card.Body>
        </Card>
    );
}

export default Item;
