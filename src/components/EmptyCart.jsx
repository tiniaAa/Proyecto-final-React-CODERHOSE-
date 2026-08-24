import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs"; // Asegúrate de tener react-icons instalado

const EmptyCart = () => {
    return (
        <Container 
            className="text-center py-5 mt-5 bg-light rounded shadow-sm d-flex flex-column align-items-center justify-content-center" 
            style={{ maxWidth: '600px', minHeight: '50vh' }}
        >
            <BsCartX size={90} className="text-muted mb-4 opacity-50" />
            
            <h2 className="fw-bold text-dark mb-3">
                ¡Tu carrito está vacío!
            </h2>
            
            <p className="text-muted mb-4 fs-5 px-3">
                Parece que aún no te decidiste. ¡Tenemos un catálogo lleno de conjuntos y packs increíbles esperando por vos!
            </p>
            
            {/* Usamos el as={Link} para fusionar el diseño de Bootstrap con React Router */}
            <Button as={Link} to="/catalogo" variant="dark" size="lg" className="px-5 rounded-pill shadow">
                Descubrir Productos
            </Button>
        </Container>
    );
}

export default EmptyCart;