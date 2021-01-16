import create from "zustand";
import { Protein } from "./utils/PROTEINS";

type SelectedProtein = Protein & {
  position: [number, number, number];
  api: any;
};

export type GlobalStateType = {
  worldRadius: number;
  temperature: number;
  loading: boolean;
  started: boolean;
  paused: boolean;
  shuffled: number; // random number to trigger useEffect
  scale: number;
  selectedProtein: null | SelectedProtein;
  set: (newState: any) => any;
};

const startsStarted = process.env.NODE_ENV === "development";

// zustand https://github.com/pmndrs/zustand
// with typescript https://react-tracked.js.org/docs/tutorial-zustand-01/
export const useStore = create<GlobalStateType>(
  (set): GlobalStateType => ({
    paused: false,
    started: startsStarted,
    loading: !startsStarted,
    worldRadius: 5,
    temperature: 0,
    shuffled: 0,
    scale: 0.0005,
    selectedProtein: null as null | SelectedProtein,
    set: (newState) => set((state) => ({ ...state, ...newState })),
  })
);
