import { create } from "zustand"; 

type LoaderState = {
  loader: boolean;
  setLoader: (estado: boolean) => void;
};

export const useLoader = create<LoaderState>((set) => ({
  loader: false,
  setLoader: (estado: boolean) => set({ loader: estado }),
}));

