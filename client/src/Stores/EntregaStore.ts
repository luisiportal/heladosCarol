import { create } from "zustand";
import { Entrega, Reparto } from "../types/General.types";
import { readLocalStorage, writeLocalStorage } from "../hooks/useLocalStorage";
type EntregaStore = {
  entrega: Entrega;
  setEntrega: (estado: Entrega) => void;
};

const entregaStoarage = readLocalStorage("entrega");

export const useEntregaStore = create<EntregaStore>((set) => ({
  entrega:
    entregaStoarage ??
    ({
      ordenante: "",
      contacto_ordenante: "",
      beneficiario: "",
      tel_beneficiario: "",
      direccion: "",
      calle: "",
      numero: "",
      calle1: "",
      calle2: "",
      reparto: {} as Reparto,
      p_referencia: "",
      observaciones: "",
    } as Entrega),
  setEntrega: (estado) => {
    set({ entrega: estado });
    writeLocalStorage("entrega", estado);
  },
}));
