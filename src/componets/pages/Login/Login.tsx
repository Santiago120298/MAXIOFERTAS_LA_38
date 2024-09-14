import axios from "axios";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login/", {
        correo,
        contraseña,
      });

      setRole(response.data.role);
      setMensaje(response.data.message);
    } catch (error: any) {
      if (error.response) {
        setMensaje(error.response.data.error || "Error en el inicio de sesión");
      } else {
        setMensaje("Error en la solicitud");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="shadow p-4 rounded bg-light">
        <div className="form-group mb-3">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>

      {mensaje && (
        <div
          className={`alert mt-4 ${role ? "alert-danger" : "alert-success"}`}
          role="alert"
        >
          {mensaje}
        </div>
      )}

      {role && (
        <div className="alert alert-info mt-2" role="alert">
          Rol: {role}
        </div>
      )}
    </div>
  );
};

export default Login;
