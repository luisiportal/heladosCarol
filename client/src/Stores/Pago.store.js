import { create } from "zustand";


export const useMetoPago = create((set) => ({
    metoPago:"",

  setMetoPago: (estado) => set({ metoPago: estado }),
}));