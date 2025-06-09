import { create } from "zustand";
import { Reserva } from "../types/General.types";


export const useMetoPag = create((set) => ({
    metoPago:"",

  setMetoPago: (estado) => set({ metoPago: estado }),
}));


type ReservaStore = {
  reserva: Reserva;
  setReserva: (estado: Reserva) => void;
};

export const useReserva = create<ReservaStore>((set) => ({
  reserva: {
    fecha: "",
    productos: [],
    moneda: "",
  },
  setReserva: (estado) => set({ reserva: estado }), // Correctly updates the entire `reserva` object
}));





