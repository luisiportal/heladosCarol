import { create } from "zustand";
import { Sabor } from "../types/General.types";
type ProductosStore = {
  productos: Sabor[];
  setProductos: (estado: Sabor[]) => void;
};

export const useProductosZustand = create<ProductosStore>((set) => ({
  productos: [] as Sabor[],
  setProductos: (estado) => set({ productos: estado }),
}));


 