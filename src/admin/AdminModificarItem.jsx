import { Card, Button, Badge } from 'react-bootstrap';

const AdminModificarItem = ({ producto, onSeleccionar }) => {
    return (
        // Si el producto no está activo, le bajamos un poco la opacidad a toda la tarjeta
        <Card className={`h-100 shadow-sm border-0 bg-light ${!producto.activo ? 'opacity-75' : ''}`}>
            
            {/* Contenedor relativo para posicionar el Badge sobre la imagen */}
            <div className="position-relative">
                <Card.Img variant="top" src={producto.imagen} style={{ height: '200px', objectFit: 'cover' }} />
                
                {/* Etiqueta visible solo para productos inactivos */}
                {!producto.activo && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-2 shadow-sm fs-6">
                        INACTIVO
                    </Badge>
                )}
            </div>
            
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-bold">{producto.nombre}</Card.Title>
                <Card.Text className="text-muted small mb-2">Stock: {producto.stock}</Card.Text>
                <Card.Text className="fw-bold fs-5 mt-auto">${producto.precio}</Card.Text>
                
                <Button 
                    variant={producto.activo ? "dark" : "outline-danger"} 
                    className="w-100 mt-3 shadow-sm fw-semibold" 
                    onClick={() => onSeleccionar(producto)}
                >
                    {producto.activo ? "Editar Producto" : "Gestionar Inactivo"}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default AdminModificarItem;