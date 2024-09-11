// src/components/UserTable.tsx
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import api from "../../api";
import { TipoDato } from "./tipoDato";

const UserTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/producto/"
        );
        setUsuarios(response.data);
      } catch (error) {
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario, index) => (
          <tr key={usuario.id}>
            <td>{index + 1}</td>
            <td>{usuario.nombre}</td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
