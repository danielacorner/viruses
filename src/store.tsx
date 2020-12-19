import create from "zustand";

// https://github.com/pmndrs/zustand
export const useStore = create((set) => ({
  worldRadius: 5,
  // increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 })
})) as any;
