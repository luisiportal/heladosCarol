import React from "react";
import Btn_Huellas from "../../../Btn_Huellas";
import ArrowRight from "../../../SVG/ArrowRight";

import ArrowLeftSVG from "../../../SVG/ArrowLeftSVG";

const NavegacionEntrega = ({ setNavegacion }) => {
  return (
    <div className="flex  justify-between">
      <div className="flex  items-center justify-center  bg-fresa  w-28 rounded-xl">
        <ArrowLeftSVG />
        <Btn_Huellas text={`Sabores`} onclick={() => setNavegacion(1)} />
      </div>

      <div className="flex items-center justify-center  bg-fresa rounded-xl w-28">
        <Btn_Huellas text={`Pagar`} type={"submit"} />
        <ArrowRight />
      </div>
    </div>
  );
};

export default NavegacionEntrega;
