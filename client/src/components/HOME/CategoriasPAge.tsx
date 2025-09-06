import { Link, useParams } from "react-router-dom";
import CategoriasSelectorHome from "../V2/CategoriasModuloHome/CategoriasSelectorHome";
import { filtrar } from "../../utils/util";

import { useProductosRequest } from "../../hooks/useProductosRequest";
import CategoriaProductoCard from "../V2/CategoriasModuloHome/CategoriaProductoCard";
import Footer from "./Footer";
import Reviews from "./Reviews";
import Horario from "../Horario/Horario";
import SelecMoneda from "../SelecMoneda";

const CategoriasPAge = () => {
  const { categoria } = useParams();
  const productos = useProductosRequest();

  const mostrar = filtrar(productos, categoria);

  return (
    <div>
       <div className="pt-20 pb-2 flex justify-between p-2">
          <Horario />

          <SelecMoneda />
        </div>
      <section className="flex flex-col gap-5 items-center justify-center -mt-8 mb-10 mx-10">
        <CategoriasSelectorHome />

        <div className="flex flex-col gap-5">
          {mostrar?.map((sabor) => (
            <CategoriaProductoCard sabor={sabor} key={sabor.id_sabor} />
          ))}
        </div>
      </section>
      <Reviews sabores={productos ?? []} />
      <Footer />
    </div>
  );
};

export default CategoriasPAge;
