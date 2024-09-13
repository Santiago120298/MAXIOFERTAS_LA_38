import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../../api";

// Define el tipo TipoDato con las nuevas propiedades
export interface TipoDato {
  id: number;
  nombre: string;
  lote: string;
  tamaño: string;
  precio: number;
  disponibilidad: number;
  caracteristicas: string;
  imagen: string; // Nueva propiedad
  sub_categorias_id: number; // Nueva propiedad
  sub_categorias_categoria_id_categoria: number; // Nueva propiedad
}

const Producto: React.FC = () => {
  const [productos, setProductos] = useState<TipoDato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para manejar el modal de productos
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<TipoDato | null>(null);

  // Estados para manejar el modal de crear producto
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<TipoDato>({
    id: 0, // Incluye ID en el estado para creación
    nombre: "",
    lote: "",
    tamaño: "",
    precio: 0,
    disponibilidad: 0,
    caracteristicas: "",
    imagen: "", // Nueva propiedad
    sub_categorias_id: 0, // Nueva propiedad
    sub_categorias_categoria_id_categoria: 0, // Nueva propiedad
  });

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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`http://localhost:3001/api/deleteProducto/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      setError("Error al eliminar el producto");
    }
  };

  const handleEdit = (producto: TipoDato) => {
    setEditProduct(producto);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleSaveChanges = async () => {
    if (editProduct) {
      try {
        await api.put(
          `http://localhost:3001/api/updateProducto/${editProduct.id}`,
          editProduct
        );
        setProductos(
          productos.map((producto) =>
            producto.id === editProduct.id ? editProduct : producto
          )
        );
        handleCloseEditModal();
      } catch (error) {
        setError("Error al guardar los cambios");
      }
    }
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editProduct) {
      const { name, value } = e.target;
      setEditProduct({ ...editProduct, [name]: value });
    }
  };

  const handleCreateProduct = async () => {
    try {
      const response = await api.post(
        "http://localhost:3001/api/settProducto/",
        newProduct
      );
      setProductos([...productos, response.data]);
      handleCloseCreateModal();
    } catch (error) {
      setError("Error al crear el producto");
    }
  };

  const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewProduct({
      id: 0, // Restablecer ID
      nombre: "",
      lote: "",
      tamaño: "",
      precio: 0,
      disponibilidad: 0,
      caracteristicas: "",
      imagen: "", // Nueva propiedad
      sub_categorias_id: 0, // Nueva propiedad
      sub_categorias_categoria_id_categoria: 0, // Nueva propiedad
    });
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between mb-3">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Crear Producto
            </Button>
          </div>
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
                  <th>Imagen</th> {/* Nueva columna */}
                  <th>Sub Categorías ID</th> {/* Nueva columna */}
                  <th>Sub Categorías Categoría ID</th> {/* Nueva columna */}
                  <th>Acciones</th>
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
                    <td>{producto.imagen}</td> {/* Nueva columna */}
                    <td>{producto.sub_categorias_id}</td> {/* Nueva columna */}
                    <td>
                      {producto.sub_categorias_categoria_id_categoria}
                    </td>{" "}
                    {/* Nueva columna */}
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(producto.id)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="warning"
                        className="ml-2"
                        onClick={() => handleEdit(producto)}
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
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProduct && (
            <Form>
              <Form.Group controlId="formProductId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  value={editProduct.id}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formProductName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editProduct.nombre}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductLote">
                <Form.Label>Lote</Form.Label>
                <Form.Control
                  type="text"
                  name="lote"
                  value={editProduct.lote}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductTamaño">
                <Form.Label>Tamaño</Form.Label>
                <Form.Control
                  type="text"
                  name="tamaño"
                  value={editProduct.tamaño}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={editProduct.precio}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductDisponibilidad">
                <Form.Label>Disponibilidad</Form.Label>
                <Form.Control
                  type="number"
                  name="disponibilidad"
                  value={editProduct.disponibilidad}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductCaracteristicas">
                <Form.Label>Caracteristicas</Form.Label>
                <Form.Control
                  type="text"
                  name="caracteristicas"
                  value={editProduct.caracteristicas}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductImagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={editProduct.imagen}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductSubCategoriasId">
                <Form.Label>Sub Categorías ID</Form.Label>
                <Form.Control
                  type="number"
                  name="sub_categorias_id"
                  value={editProduct.sub_categorias_id}
                  onChange={handleChangeEdit}
                />
              </Form.Group>
              <Form.Group controlId="formProductSubCategoriasCategoriaId">
                <Form.Label>Sub Categorías Categoría ID</Form.Label>
                <Form.Control
                  type="number"
                  name="sub_categorias_categoria_id_categoria"
                  value={editProduct.sub_categorias_categoria_id_categoria}
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

      {/* Modal de Crear Producto */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={newProduct.id}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newProduct.nombre}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductLote">
              <Form.Label>Lote</Form.Label>
              <Form.Control
                type="text"
                name="lote"
                value={newProduct.lote}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductTamaño">
              <Form.Label>Tamaño</Form.Label>
              <Form.Control
                type="text"
                name="tamaño"
                value={newProduct.tamaño}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={newProduct.precio}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductDisponibilidad">
              <Form.Label>Disponibilidad</Form.Label>
              <Form.Control
                type="number"
                name="disponibilidad"
                value={newProduct.disponibilidad}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductCaracteristicas">
              <Form.Label>Caracteristicas</Form.Label>
              <Form.Control
                type="text"
                name="caracteristicas"
                value={newProduct.caracteristicas}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={newProduct.imagen}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductSubCategoriasId">
              <Form.Label>Sub Categorías ID</Form.Label>
              <Form.Control
                type="number"
                name="sub_categorias_id"
                value={newProduct.sub_categorias_id}
                onChange={handleChangeCreate}
              />
            </Form.Group>
            <Form.Group controlId="formProductSubCategoriasCategoriaId">
              <Form.Label>Sub Categorías Categoría ID</Form.Label>
              <Form.Control
                type="number"
                name="sub_categorias_categoria_id_categoria"
                value={newProduct.sub_categorias_categoria_id_categoria}
                onChange={handleChangeCreate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Crear Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Producto;
