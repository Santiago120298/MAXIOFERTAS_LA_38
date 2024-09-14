import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import Register from "../Registro";
import Productos from "../Productos";
import LoginPage from "../Login";
import Admin from "../admin";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Registro", element: <Register /> },
  { path: "/Productos", element: <Productos /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/homelogin", element: <LoginPage /> },
  { path: "/admin", element: <Admin /> },
]);

export default router;
