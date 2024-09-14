import Carrito from "../../admin/CarritoDeCompras";
import Categoria from "../../admin/Categoria";
import Producto from "../../admin/Producto";
import SubCategoria from "../../admin/Sub_Categoria";
import Usuario from "../../admin/Usuario";
import Footer from "../../footer";
import BarraDeNavegacion from "../../navBar";

export default function Admin() {
  return (
    <div>
      <BarraDeNavegacion />
      <Categoria />
      <SubCategoria />
      <Producto />
      <Usuario />
      <Carrito />
      <Footer />
    </div>
  );
}
