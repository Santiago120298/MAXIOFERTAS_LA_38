import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import api from "../../../api";
import { TipoDato } from "./SubCategoriaDato";

const SubCategoria: React.FC = () => {
  const [sub_categoria, setsub_categoria] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubCategoria = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/subcategorias"
        );
        setsub_categoria(response.data);
      } catch (error) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategoria();
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
                  <th>categoria_id_categoria</th>
                </tr>
              </thead>
              <tbody>
                {sub_categoria.map((sub_categoria) => (
                  <tr key={sub_categoria.id}>
                    <td>{sub_categoria.id}</td>
                    <td>{sub_categoria.nombre}</td>
                    <td>{sub_categoria.categoria_id_categoria}</td>
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

export default SubCategoria;
