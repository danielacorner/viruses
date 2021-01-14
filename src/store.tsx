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
    // TODO: display scale on walls
    // TODO: angstrom & nanometer https://www.google.com/search?q=angstrom+scale+vs+nanometer&rlz=1C1CHBF_enCA921CA921&oq=angstrom+scale+vs+nanometer&aqs=chrome..69i57j33i22i29i30.9447j0j1&sourceid=chrome&ie=UTF-8
    scale: 0.001,
    selectedProtein: null as null | SelectedProtein,
    set: (newState) => set((state) => ({ ...state, ...newState })),
    // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 })
  })
);
