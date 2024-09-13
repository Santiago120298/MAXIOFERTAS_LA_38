import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import Register from "../Registro";
import Productos from "../Productos";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Registro", element: <Register /> },
  { path: "/Productos", element: <Productos /> },
]);

export default router;
