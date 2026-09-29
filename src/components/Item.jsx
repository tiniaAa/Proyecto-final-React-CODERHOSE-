import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const Item = (props) => {
    const { agregar } = useContext(CartContext);
    
    

    // Extraemos la foto de portada (la primera del array). 
    // Si no tiene, ponemos una de relleno.
    const imagenPortada = (props.producto.rutasImagenes && props.producto.rutasImagenes.length > 0) 
        ? props.producto.rutasImagenes[0] 
        : "https://via.placeholder.com/300x300?text=Sin+Imagen";
    
    return (
        <Card className="h-100 shadow-sm border-0 bg-white">
            <Card.Img 
                variant="top" 
                src={imagenPortada} 
                //onError={handleImageError} 
                style={{ height: "200px", objectFit: "cover" }} 
            />
            
            <Card.Body className="d-flex flex-column text-center">
                <Card.Title className="fs-6 fw-bold mb-2">
                    {props.producto.nombre}
                </Card.Title>
                
                <Card.Text className="text-muted small text-truncate mb-3">
                    {props.producto.descripcion}
                </Card.Text>
                
                <Card.Text className="fw-bold fs-5 text-dark mb-4">
                    ${props.producto.precio}
                </Card.Text>
                
                <Link to={`/productoDetalle/${props.producto.id}`} className='btn btn-dark mt-auto shadow-sm'>
                    Ver más
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Item;