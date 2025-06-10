import { create } from "zustand";

type ShowDialogStore = {
  showDialog: boolean;
  setShowDialog: (estado: boolean) => void;
};

export const useShowDialogStore = create<ShowDialogStore>((set) => ({
    showDialog: false,

    setShowDialog: (estado: boolean) => set({ showDialog: estado }),
}));
