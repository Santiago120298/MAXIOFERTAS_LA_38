import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import api from "../../../api";
import { TipoDato } from "./CategoriaDato";

const Categoria: React.FC = () => {
  const [categoria, setCategoria] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/categories"
        );
        setCategoria(response.data);
      } catch (error) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
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
                </tr>
              </thead>
              <tbody>
                {categoria.map((categoria) => (
                  <tr key={categoria.id_categoria}>
                    <td>{categoria.id_categoria}</td>
                    <td>{categoria.nombre}</td>
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

export default Categoria;
