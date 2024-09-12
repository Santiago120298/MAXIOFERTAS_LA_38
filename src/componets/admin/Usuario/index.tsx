import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import api from "../../../api";
import { TipoDato } from "./UsuarioDato";

const Usuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/usuarios"
        );
        setUsuarios(response.data);
      } catch (error) {
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="table-responsive">
            <Table striped bordered hover className="table-info">
              <thead>
                <tr>
                  <th>Numero de documento</th>
                  <th>Tipo de documento</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Rol</th>
                  <th>Fecha_nacimiento</th>
                  <th>Correo</th>
                  <th>Contraseña</th>
                  <th>Confirmacion de contraseña</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.numero_doc}>
                    <td>{usuario.numero_doc}</td>
                    <td>{usuario.tipo_doc}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellidos}</td>
                    <td>{usuario.direccion}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.fecha_nacimiento}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.contraseña}</td>
                    <td>{usuario.contraseña_confirmada}</td>
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

export default Usuario;
