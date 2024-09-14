import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../../api";

// Define el tipo para las categorías
export interface TipoDato {
  id_categoria: number;
  nombre: string;
}

const Categoria: React.FC = () => {
  const [categorias, setCategorias] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para manejo de modal de edición
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<TipoDato | null>(null);

  // Estados para manejar el modal de crear categoría
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<TipoDato>({
    id_categoria: 0,
    nombre: "",
  });

  // Obtener categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get<TipoDato[]>(
          "http://localhost:3001/api/categories"
        ); // Aquí iría tu endpoint
        setCategorias(response.data);
      } catch (error) {
        setError("Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`http://localhost:3001/api/categories/${id}`); // Endpoint de eliminar categoría
      setCategorias(
        categorias.filter((categoria) => categoria.id_categoria !== id)
      );
    } catch (error) {
      setError("Error al eliminar la categoría");
    }
  };

  // Manejar edición
  const handleEdit = (categoria: TipoDato) => {
    setEditCategory(categoria);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditCategory(null);
  };

  const handleSaveChanges = async () => {
    if (editCategory) {
      try {
        await api.put(
          `http://localhost:3001/api/categories/${editCategory.id_categoria}`, // Endpoint de actualizar categoría
          editCategory
        );
        setCategorias(
          categorias.map((categoria) =>
            categoria.id_categoria === editCategory.id_categoria
              ? editCategory
              : categoria
          )
        );
        handleCloseEditModal();
      } catch (error) {
        setError("Error al guardar los cambios");
      }
    }
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editCategory) {
      const { name, value } = e.target;
      setEditCategory({ ...editCategory, [name]: value });
    }
  };

  // Manejar creación de categoría
  const handleCreateCategory = async () => {
    try {
      const response = await api.post(
        "http://localhost:3001/api/categories", // Endpoint de crear categoría
        newCategory
      );
      setCategorias([...categorias, response.data]);
      handleCloseCreateModal();
    } catch (error) {
      setError("Error al crear la categoría");
    }
  };

  const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewCategory({ id_categoria: 0, nombre: "" });
  };

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between mb-3">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Crear Categoría
            </Button>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover className="table-info">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id_categoria}>
                    <td>{categoria.id_categoria}</td>
                    <td>{categoria.nombre}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(categoria.id_categoria)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="warning"
                        className="ml-2"
                        onClick={() => handleEdit(categoria)}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editCategory && (
            <Form>
              <Form.Group controlId="formCategoryId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id_categoria"
                  value={editCategory.id_categoria}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formCategoryName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editCategory.nombre}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Crear */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCreateCategoryId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id_categoria"
                value={newCategory.id_categoria}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formCreateCategoryName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newCategory.nombre}
                onChange={handleChangeCreate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateCategory}>
            Crear Categoría
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categoria;
