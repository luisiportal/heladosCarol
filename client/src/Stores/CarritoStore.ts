import { create } from "zustand";
import { Sabor } from "../types/General.types";
type CarritoStore = {
  productosCarrito: ProductoCarrito[];
  setProductosCarrito: (estado: ProductoCarrito[]) => void;
};

export type ProductoCarrito = {
  producto: Sabor;
  cantidad: number;
};

export const useCarritoStore = create<CarritoStore>((set) => ({
  productosCarrito: [
    {
      cantidad: 0,
    },
  ] as ProductoCarrito[],
  setProductosCarrito: (estado) => set({ productosCarrito: estado }),
}));
