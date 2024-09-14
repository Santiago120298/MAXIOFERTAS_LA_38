// Footer.tsx
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          {/* Sección de Redes Sociales */}
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a
                href="https://facebook.com"
                className="text-light me-3"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-light me-3"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-light me-3"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-light"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>

          {/* Sección de Información de Contacto */}
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaMapMarkerAlt />{" "}
                <span className="ms-2">123 Main Street, Anytown, USA</span>
              </li>
              <li className="mb-2">
                <FaPhone /> <span className="ms-2">+1 (123) 456-7890</span>
              </li>
              <li className="mb-2">
                <FaEnvelope />{" "}
                <span className="ms-2">info@yourcompany.com</span>
              </li>
            </ul>
          </Col>

          {/* Sección de Enlaces Útiles */}
          <Col md={3}>
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-light">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-light">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Sección de Derechos de Autor */}
        <Row>
          <Col className="text-center mt-4">
            <p className="mb-0">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
