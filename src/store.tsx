import create from "zustand";

// https://github.com/pmndrs/zustand
export const useStore = create((set) => ({
  worldRadius: 5,
  temperature: 1,
  // TODO: display scale on walls
  scale: 0.001,
  set: (newState) => set((state) => ({ ...state, ...newState })),
  // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 })
})) as any;
