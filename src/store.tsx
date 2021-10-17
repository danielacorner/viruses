import create from "zustand";
import { MAX_SCALE, MIN_SCALE } from "./utils/constants";
import { Protein } from "./utils/PROTEINS";
import { atomWithStorage } from "jotai/utils";

export const isAudioPlayingAtom = atomWithStorage("isAudioPlaying", false); // As of Chrome 66, videos must be muted in order to play automatically https://www.npmjs.com/package/react-player
export const scaleAtom = atomWithStorage("scale", MAX_SCALE); // As of Chrome 66, videos must be muted in order to play automatically https://www.npmjs.com/package/react-player
export const isDarkModeAtom = atomWithStorage("isDarkMode", true);

type SelectedProtein = Protein & {
  position: [number, number, number];
  api: any;
};

type GlobalStateType = {
  worldRadius: number;
  temperature: number;
  isTooltipMaximized: boolean;
  loading: boolean;
  started: boolean;
  startedThunderdome: boolean;
  paused: boolean;
  hasRunOutOfMemory: boolean;
  shuffled: number; // random number to trigger useEffect
  selectedProtein: null | SelectedProtein;
  set: (newState: any) => any;
  setTemperature: (newT: number) => any;
};

// const startsStarted = true;
const startsStarted = false && process.env.NODE_ENV === "development";

// zustand https://github.com/pmndrs/zustand
// with typescript https://react-tracked.js.org/docs/tutorial-zustand-01/
export const useStore = create<GlobalStateType>(
  (set): GlobalStateType => ({
    isTooltipMaximized: false,
    paused: false,
    hasRunOutOfMemory: false,
    started: startsStarted,
    startedThunderdome: false,
    loading: !startsStarted,
    worldRadius: 5,
    temperature: 1,
    shuffled: 0,
    selectedProtein: null as null | SelectedProtein,
    set: (newState) => set((state) => ({ ...state, ...newState })),
    setTemperature: (newT) => set(() => ({ temperature: newT })),
  })
);

import { Canvas, useThree } from "@react-three/fiber";

function FullPageOverlayFollowsMouse() {
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
    <Canvas style={{ width: window.innerWidth, height: window.innerHeight }}>
      <ThingThatFollowsMouse />
    </Canvas>
  </div>;
}

function ThingThatFollowsMouse() {
  const { mouse } = useThree();
  return (
    <mesh>
      <meshBasicMaterial />
      <boxBufferGeometry />
    </mesh>
  );
}
