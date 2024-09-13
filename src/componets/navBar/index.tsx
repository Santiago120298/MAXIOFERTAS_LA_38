import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function BarraDeNavegacion() {
  return (
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand className="text-warning" href="#home">
          Maxiofertas la 38
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Este Nav contiene "Iniciar sesión" y se coloca a la derecha */}
          <Nav className="me-auto">
            <Nav.Link className="text-warning" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="text-warning" href="#link">
              Link
            </Nav.Link>

            {/* Dropdown modificado con texto amarillo */}
            <NavDropdown
              title={<span className="text-warning">Categorias</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                className="bg-success text-warning"
                href="#action/3.1"
              >
                Action
              </NavDropdown.Item>
              <NavDropdown.Item
                className="bg-success text-warning"
                href="#action/3.2"
              >
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item
                className="bg-success text-warning"
                href="#action/3.3"
              >
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className="bg-success text-warning"
                href="#action/3.4"
              >
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Sección para "Iniciar sesión" que se coloca a la izquierda */}
          <Nav>
            <Nav.Link className="text-warning" href="#login">
              Iniciar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraDeNavegacion;
