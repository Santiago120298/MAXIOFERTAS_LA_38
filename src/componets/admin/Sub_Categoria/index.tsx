import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"; // Para los botones
import Modal from "react-bootstrap/Modal"; // Para los formularios de creación y actualización
import Form from "react-bootstrap/Form"; // Formulario para crear/actualizar subcategorías
import api from "../../../api";
import { TipoDato } from "./SubCategoriaDato";

const SubCategoria: React.FC = () => {
  const [sub_categoria, setSubCategoria] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingSubCategoria, setEditingSubCategoria] =
    useState<TipoDato | null>(null);
  const [newSubCategoria, setNewSubCategoria] = useState<TipoDato>({
    id: 0,
    nombre: "",
    categoria_id_categoria: 0,
  });

  useEffect(() => {
    const fetchSubCategoria = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/subcategorias"
        );
        setSubCategoria(response.data);
      } catch (error) {
        setError("Error al cargar subcategorías");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategoria();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/subcategorias/${id}`);
      setSubCategoria(sub_categoria.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Error al eliminar subcategoría:", error);
    }
  };

  const handleSave = async () => {
    if (editingSubCategoria) {
      // Update subcategory
      try {
        await api.put(
          `/api/subcategorias/${editingSubCategoria.id}`,
          newSubCategoria
        );
        setSubCategoria(
          sub_categoria.map((sub) =>
            sub.id === editingSubCategoria.id ? newSubCategoria : sub
          )
        );
      } catch (error) {
        console.error("Error al actualizar subcategoría:", error);
      }
    } else {
      // Create new subcategory
      try {
        const response = await api.post(`/api/subcategorias`, newSubCategoria);
        setSubCategoria([...sub_categoria, response.data]);
      } catch (error) {
        console.error("Error al crear subcategoría:", error);
      }
    }
    setShowModal(false);
  };

  const handleEdit = (sub: TipoDato) => {
    setEditingSubCategoria(sub);
    setNewSubCategoria(sub);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingSubCategoria(null);
    setNewSubCategoria({ id: 0, nombre: "", categoria_id_categoria: 0 });
    setShowModal(true);
  };

  if (loading) return <p>Cargando subcategorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="table-responsive">
            <Button variant="success" onClick={handleCreate}>
              Crear SubCategoría
            </Button>
            <Table striped bordered hover className="table-info mt-3">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Categoria ID</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sub_categoria.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.id}</td>
                    <td>{sub.nombre}</td>
                    <td>{sub.categoria_id_categoria}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(sub)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(sub.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Modal para crear/editar subcategoría */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSubCategoria ? "Editar SubCategoría" : "Crear SubCategoría"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newSubCategoria.nombre}
                onChange={(e) =>
                  setNewSubCategoria({
                    ...newSubCategoria,
                    nombre: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="categoria_id_categoria">
              <Form.Label>ID de Categoría</Form.Label>
              <Form.Control
                type="number"
                value={newSubCategoria.categoria_id_categoria}
                onChange={(e) =>
                  setNewSubCategoria({
                    ...newSubCategoria,
                    categoria_id_categoria: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SubCategoria;
