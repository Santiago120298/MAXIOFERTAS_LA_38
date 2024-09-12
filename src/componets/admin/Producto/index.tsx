import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import api from "../../../api";
import { TipoDato } from "./ProductoDato";

const Producto: React.FC = () => {
  const [productos, setProductos] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/producto/"
        );
        setProductos(response.data);
      } catch (error) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
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
                  <th>Nombre</th>
                  <th>Lote</th>
                  <th>Tamaño</th>
                  <th>Precio</th>
                  <th>Disponibilidad</th>
                  <th>Caracteristicas</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.lote}</td>
                    <td>{producto.tamaño}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.disponibilidad}</td>
                    <td>{producto.caracteristicas}</td>
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

export default Producto;
