
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from './CartWidget ';
import { NavDropdown } from 'react-bootstrap'; 
import { Link,NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <header>
            <Navbar expand="lg" className="header">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className='brand'>AMMA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/catalogo" className={"nav-link"}>Catalogo</NavLink>
                            <NavDropdown title="Categorias" id="basic-nav-dropdown">                                
                                <NavLink to="/catalogo/filtro/pack" className="dropdown-item">Pack </NavLink>                                
                                <NavLink to="/catalogo/filtro/conjunto" className="dropdown-item">Conjunto</NavLink>
                                <NavLink to="/catalogo/filtro/simple" className="dropdown-item">Simple</NavLink>   
                            </NavDropdown>
                            <NavLink to="/carrito" className={"nav-link"} ><CartWidget/></NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header;