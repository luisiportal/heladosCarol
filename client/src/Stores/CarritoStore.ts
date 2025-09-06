import { create } from "zustand";
import { Sabor } from "../types/General.types";
import { readLocalStorage, writeLocalStorage } from "../hooks/useLocalStorage";
type CarritoStore = {
  productosCarrito: ProductoCarrito[];
  setProductosCarrito: (estado: ProductoCarrito[]) => void;
};

export type ProductoCarrito = {
  producto: Sabor;
  cantidad: number;
};

const carritoStorage = readLocalStorage("carrito");

export const useCarritoStore = create<CarritoStore>((set) => ({
  productosCarrito:carritoStorage?? [] as ProductoCarrito[],
  setProductosCarrito: (estado) => {
    set({ productosCarrito: estado });
    writeLocalStorage("carrito", estado);
  },
}));
