import { create } from "zustand";
type MonedaStore = {
  pasarela: string;
  setPasarela: (estado: string) => void;
};

export const usePasarelaStore = create<MonedaStore>((set) => ({
  pasarela: "Zelle",
  setPasarela: (estado) => set({ pasarela: estado }),
}));
