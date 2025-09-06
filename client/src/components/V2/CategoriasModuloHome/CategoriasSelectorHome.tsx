import { Link } from "react-router-dom";
import TituloModulo from "../DesingSystem/TituloModulo";
import CardCategoriasSelectorHome from "./CardCategoriasSelectorHome";

const CategoriasSelectorHome = () => {
  return (
    <section>
      <TituloModulo titulo="Nuestros Productos" />

      <div className="flex justify-center gap-3">
        <Link to={"/categorias/Potes"}>
          {" "}
          <CardCategoriasSelectorHome titulo="Potes" image="poteCat.jpg" />
        </Link>
        <Link to={"/categorias/Tinas"}>
          <CardCategoriasSelectorHome titulo="Tinas" image="tinaCat.jpg" />
        </Link>

         <Link to={"/categorias/Combos"}>
          <CardCategoriasSelectorHome titulo="Combos" image="combo3.png" />{" "}
        </Link>

        <Link to={"/categorias/Todos"}>
          {" "}
          <CardCategoriasSelectorHome titulo="Todos" image="poteCat.jpg" />
        </Link>
      </div>
    </section>
  );
};

export default CategoriasSelectorHome;
