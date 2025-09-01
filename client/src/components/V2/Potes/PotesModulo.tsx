import { Sabor } from "../../../types/General.types";
import TituloModulo from "../DesingSystem/TituloModulo";
import PotesCard from "./PotesCard";

const PotesModulo = ({ sabores }: { sabores: Sabor[] }) => {
  const categoria = sabores[0]?.categoria;

  const tituloModulo = () => {
    switch (categoria) {
      case "Potes":
        return "Potes de Helado";
      case "Tinas":
        return "Tinas de Helados Carol";
      case "Combos":
        return "Combos de Helados Carol";
      case "Todos":
        return "Todos Nuestros Productos";
    }
  };

  return (
    <section>
      {" "}
      <TituloModulo titulo={tituloModulo() || ""} />
      <section className="w-full overflow-x-auto">
        <div className="flex gap-3 w-max pb-2">
          {sabores.map((sabor) => (
            <PotesCard
              sabor={sabor}
              key={sabor.id_sabor}
              css="w-[132px] h-48"
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default PotesModulo;
