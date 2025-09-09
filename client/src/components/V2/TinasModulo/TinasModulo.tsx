import { Sabor } from "../../../types/General.types";
import TituloModulo from "../DesingSystem/TituloModulo";
import TinaCard from "./TinaCard";

const TinasModulo = ({ tinas }: { tinas: Sabor[] }) => {
  return (
    <section className="mt-10">
      {" "}
      <TituloModulo titulo="Tinas de Helados Carol" />
      <div className={`overflow-scroll flex ${tinas.length < 3 && "justify-center"}`}><div className="flex gap-3 w-max pb-2">
        {tinas.map((sabor) => (
          <TinaCard sabor={sabor} key={sabor.id_sabor} css="w-40 h-fit" />
        ))}
      </div></div>
    </section>
  );
};

export default TinasModulo;
