import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import api from "../../../api";
import { TipoDato } from "./CarritoDato";

const Carrito: React.FC = () => {
  const [carrito, setcarrito] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/car"
        );
        setcarrito(response.data);
      } catch (error) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="table-responsive">
            <Table striped bordered hover className="table-info">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>fecha_compra</th>
                  <th>cantidad_productos</th>
                  <th>valor_producto</th>
                  <th>valor_total</th>
                  <th>metodos_pago</th>
                  <th>servicios_id</th>
                  <th>usuarios_numero_doc</th>
                  <th>producto_id</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((carrito) => (
                  <tr key={carrito.id}>
                    <td>{carrito.id}</td>
                    <td>{carrito.fecha_compra}</td>
                    <td>{carrito.cantidad_productos}</td>
                    <td>{carrito.valor_producto}</td>
                    <td>{carrito.valor_total}</td>
                    <td>{carrito.metodos_pago}</td>
                    <td>{carrito.servicios_id}</td>
                    <td>{carrito.usuarios_numero_doc}</td>
                    <td>{carrito.producto_id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
