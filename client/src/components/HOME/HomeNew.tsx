import React, { useEffect, useState } from "react";
import Recomendado from "../V2/Recomendado/Recomendado";
import CategoriasSelectorHome from "../V2/CategoriasModuloHome/CategoriasSelectorHome";
import PotesModulo from "../V2/Potes/PotesModulo";
import { Sabor } from "../../types/General.types";
import LoQueBuscan from "../V2/LoQueBuscan/LoQueBuscan";
import BannerDisfrute from "../V2/BannerDisfrute/BannerDisfrute";
import TinasModulo from "../V2/TinasModulo/TinasModulo";
import CombosHeladosCarol from "../V2/CombosHelados/CombosHeladosCarol";
import { useProductosZustand } from "../../Stores/ProductoStore";
import { useQuery } from "@tanstack/react-query";
import { getSaboresRequest } from "../../api/sabores.api";
import { filtrar } from "../../utils/util";

const HomeNew = () => {
  const { setProductos } = useProductosZustand();


  const { data } = useQuery({
    queryKey: ["prodcutos"],
    queryFn: () => getSaboresRequest(),
  });

  const sabores = data?.data ?? ([] as Sabor[]);

  useEffect(() => {
    setProductos(sabores);
  }, []);

  

  const potes = filtrar(sabores, "Potes");
  const combos = filtrar(sabores, "Combos");
  const tinas = filtrar(sabores, "Tinas");
  const recomendado = combos[Math.floor(Math.random() * combos.length)];

 

  return (
    <div className="bg-neutral-100 overflow-hidden relative">
      <div className="  bg-vainilla absolute top-40 w-[879px] h-[337px] rounded-[55%/35%] -rotate-[35deg] translate-y-52 -translate-x-40"></div>
      <div className="pt-16 p-2 pb-24 relative z-10">
        <Recomendado producto={recomendado} />
        <CategoriasSelectorHome/>
        <PotesModulo sabores={potes} />
        <LoQueBuscan producto={combos[0]} />
        <BannerDisfrute />
        <TinasModulo tinas={tinas} />
        <CombosHeladosCarol combos={combos} />
      </div>
      <div className="bg-fresa/80 absolute top-[750px] w-[879px] h-[337px] rounded-[55%/35%] -rotate-[35deg] translate-y-52 -translate-x-40"></div>
      <div className="bg-vainilla absolute top-[1400px] w-[879px] h-[337px] rounded-[55%/35%] -rotate-[25deg] translate-y-52 -translate-x-40"></div>
      <div className="bg-fresa/80 absolute top-[1950px] w-[879px] h-[337px] rounded-[55%/35%] -rotate-[35deg] translate-y-52 -translate-x-40"></div>
    </div>
  );
};

export default HomeNew;
