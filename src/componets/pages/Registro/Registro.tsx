import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

interface UserForm {
  numero_doc: number;
  tipo_doc: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  telefono: number;
  fecha_nacimiento: string;
  correo: string;
  contraseña: string; // Cambiado a string para mayor compatibilidad
  contraseña_confirmada: string; // Cambiado a string para mayor compatibilidad
}

const Registro: React.FC = () => {
  const [formData, setFormData] = useState<UserForm>({
    numero_doc: 0,
    tipo_doc: "",
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: 0,
    fecha_nacimiento: "",
    correo: "",
    contraseña: "",
    contraseña_confirmada: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/register", formData);
      alert("Usuario creado con éxito: " + response.data.message);
    } catch (error) {
      console.error("Error al crear el usuario", error);
      alert("Error al crear el usuario");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Número de documento</label>
              <input
                type="number"
                className="form-control"
                name="numero_doc"
                value={formData.numero_doc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Tipo de documento</label>
              <input
                type="text"
                className="form-control"
                name="tipo_doc"
                value={formData.tipo_doc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Apellidos</label>
              <input
                type="text"
                className="form-control"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Teléfono</label>
              <input
                type="number"
                className="form-control"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="contraseña_confirmada"
                value={formData.contraseña_confirmada}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" style={{ display: "block" }}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
