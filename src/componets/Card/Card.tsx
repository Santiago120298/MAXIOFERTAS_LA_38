import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  nombre: string;
  caracteristicas: string;
  imagen: string;
}

const Card: React.FC = () => {
  const [producto, setProducto] = useState<Product[]>([]);

  // Función para obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/producto/"); // URL de tu API
      setProducto(response.data); // Asume que la respuesta es un array de productos
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {producto.map((producto) => (
          <div className="col-md-4" key={producto.id}>
            <div className="card mb-4">
              <img
                style={{ height: "250px" }}
                src={producto.imagen}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.caracteristicas}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
