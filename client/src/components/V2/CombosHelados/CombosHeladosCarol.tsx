import { Sabor } from "../../../types/General.types";
import TituloModulo from "../DesingSystem/TituloModulo";

import ComboCard from "./ComboCard";

const CombosHeladosCarol = ({ combos }: { combos: Sabor[] }) => {

  return (
    <section className=" ">
      {" "}
      <TituloModulo titulo="Combos Helados Carol" />
      <div className="flex justify-center flex-wrap gap-4 w-full pb-2">
        {combos.map((sabor) => (
          <ComboCard sabor={sabor} key={sabor.id_sabor} />
        ))}
      </div>
    </section>
  );
};

export default CombosHeladosCarol;
