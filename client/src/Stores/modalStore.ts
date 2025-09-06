import { create } from "zustand";
import { Modal } from "../types/General.types";

type ModalStore = {
  modal: Modal;
  setModal: (estado: Modal) => void;
};

export const useModal = create<ModalStore>((set) => ({
  modal: {
    mensaje: "",
    errorColor: false,
    activo: false,
    navegarA: "",
  },

  setModal: (estado: Modal) => {
    console.log(estado);
    
    set({ modal: estado })},
}));
