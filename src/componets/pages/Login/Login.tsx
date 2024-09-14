import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [alerta, setAlerta] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Hacer la solicitud POST al backend
      const response = await axios.post("http://localhost:3001/api/login", {
        correo,
        contraseña,
      });

      // Limpiar alertas anteriores
      setAlerta(null);

      // Redirigir según la respuesta del backend
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);

      // Verificar si el error tiene respuesta del backend
      if (axios.isAxiosError(error) && error.response) {
        setAlerta(error.response.data.message || "Error desconocido");
      } else {
        setAlerta("Error en la conexión con el servidor");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          {alerta && <div className="alert alert-danger">{alerta}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="contraseña">Contraseña</label>
              <input
                type="password"
                id="contraseña"
                className="form-control"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
