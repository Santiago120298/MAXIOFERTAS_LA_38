import Usuario from "./componets/admin/Usuario";
import Producto from "./componets/admin/Producto";
import Categoria from "./componets/admin/Categoria";
import SubCategoria from "./componets/admin/Sub_Categoria";
import Carrito from "./componets/admin/CarritoDeCompras";
import Registro from "./componets/pages/Registro";
import Card from "./Card/Card";
import BarraDeNavegacion from "./componets/navBar";

function App() {
  return (
    <div>
      <Usuario />
      <Producto />
      <Categoria />
      <SubCategoria />
      <Carrito />
      <Registro />
      <Card />
      <BarraDeNavegacion />
    </div>
  );
}

export default App;
