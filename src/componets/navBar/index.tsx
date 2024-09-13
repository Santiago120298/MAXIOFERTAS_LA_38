import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function BarraDeNavegacion() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="text-warning">
          Maxiofertas la 38
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")} className="text-warning">
              Home
            </Nav.Link>
            <Nav.Link
              className="text-warning"
              onClick={() => navigate("/Productos")}
            >
              Productos
            </Nav.Link>
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

          <Nav>
            <Nav.Link className="text-warning" href="#login">
              Iniciar sesión
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="text-warning"
              onClick={() => navigate("/registro")}
            >
              Registro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraDeNavegacion;
