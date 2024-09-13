import Footer from "../../footer";
import BarraDeNavegacion from "../../navBar";
import Card from "../../Card/Card";

type Props = {};

export default function Productos({}: Props) {
  return (
    <div>
      <BarraDeNavegacion />
      <Card />
      <Footer />
    </div>
  );
}
