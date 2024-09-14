import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function BarraDeNavegacion() {
  const navigate = useNavigate();
  return (
    <Navbar
      style={{ height: "100px" }}
      expand="lg"
      className="bg-success sticky-top"
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="text-warning">
          <h1>Maxiofertas la 38</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link onClick={() => navigate("/")} className="text-warning ">
              <h5>Home</h5>
            </Nav.Link>
            <Nav.Link
              className="text-warning"
              onClick={() => navigate("/Productos")}
            >
              <h5>Productos</h5>
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              className="text-warning"
              href="#login"
              onClick={() => navigate("/login")}
            >
              <h5> Iniciar sesión</h5>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="text-warning"
              onClick={() => navigate("/registro")}
            >
              <h5> Registro</h5>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraDeNavegacion;
