import { create } from "zustand";
type MonedaStore = {
  moneda: string;
  setMoneda: (estado: string) => void;
};

export const useMonedaStore = create<MonedaStore>((set) => ({
  moneda: "USD",
  setMoneda: (estado) => set({ moneda: estado }),
}));
