import create from "zustand";
import { Protein } from "./utils/PROTEINS";

export type GlobalStateType = {
  worldRadius: number;
  temperature: number;
  paused: boolean;
  // TODO: display scale on walls
  scale: number;
  selectedProtein: null | Protein;
  set: (newState: any) => any;
};
// zustand https://github.com/pmndrs/zustand
// with typescript https://react-tracked.js.org/docs/tutorial-zustand-01/
export const useStore = create<GlobalStateType>(
  (set): GlobalStateType => ({
    paused: false,
    worldRadius: 5,
    temperature: 1,
    // TODO: display scale on walls
    scale: 0.001,
    selectedProtein: null as null | Protein,
    set: (newState) => set((state) => ({ ...state, ...newState })),
    // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 })
  })
);
