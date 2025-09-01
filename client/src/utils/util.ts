import { Sabor } from "../types/General.types";

export const filtrar = (sabores: Sabor[], tipo) => {
  if (tipo === "Todos") return sabores;
  return sabores?.filter(
    (item) => item.categoria === tipo && item.existencia >= 1
  );
};

