import create from "zustand";
import { MAX_SCALE } from "./utils/constants";
import { Protein } from "./utils/PROTEINS";

type SelectedProtein = Protein & {
  position: [number, number, number];
  api: any;
};

type VirusParticle = { virusData: Protein; iconIdx: number; id_str: string };
type AntibodyParticle = { abData: Protein; iconIdx: number; id_str: string };

type GlobalStateType = {
  /** radius of the cube container */
  worldRadius: number;
  /** number of the wave we're currently on */
  currentWaveIdx: number;
  /** are ya winning, son? */
  isWaveComplete: boolean;
  /** to track whether the wave is completed */
  numDefeatedViruses: number;
  /** to track whether the wave is completed */
  incrementNumDefeatedViruses: () => any;
  /** temperature = particle velocity */
  temperature: number;
  /** modal version of tooltip */
  isTooltipMaximized: boolean;
  /** player HP, shows in the playerHpBar */
  playerHp: number;
  /** mute the music */
  soundOn: boolean;
  /** show/hide the HP bar & icons */
  showHp: boolean;
  /** has the app been started */
  started: boolean;
  /** is the game paused / temperature === 0 */
  paused: boolean;
  /** if a property in the store is animating e.g. scale, can turn things on/off */
  isPropertyAnimating: boolean;
  /** how high is the 3d container's ceiling */
  ceilingHeight: number;
  waveStartTime: number | null;
  pointerDownStartTime: number | null;
  absCreatedSincePointerDown: number;
  /** scale of the scene */
  scale: number;
  /** which virus do the produced antibodies target? */
  targetVirusIdx: number;
  /** which cell was clicked? determines how the antibodies spawn */
  cellButtonIdx: number;
  /** the viruses currently in the game (or already defeated/unmounted) */
  viruses: VirusParticle[];
  /** the antibodies currently in the game (or already defeated/unmounted) */
  antibodies: AntibodyParticle[];
  /** the viruses currently in the game (or already defeated/unmounted) */
  createVirus: (newVir: VirusParticle) => any;
  /** the antibodies currently in the game (or already defeated/unmounted) */
  createAntibody: (newAb: AntibodyParticle) => any;
  /** which protein was clicked on / displays the tooltip info */
  selectedProtein: null | SelectedProtein;
  /** which protein was clicked on / displays the tooltip info */
  setSelectedProtein: (newSelectedProtein: null | SelectedProtein) => void;
  set: (newState: any) => any;
  setScale: (newScale: any) => any;
  setTemperature: (newTemp: any) => any;
};

const startsStarted = false && process.env.NODE_ENV === "development";

export const INITIAL_PLAYER_HP = 4000;
export const INITIAL_CEILING_HEIGHT = 10;

export function getSettingsFromLS() {
  const settings = window.localStorage.getItem("settings");
  return JSON.parse(settings);
}

const initialSoundOn = (() => {
  const settings = getSettingsFromLS();
  return settings && "soundOn" in settings ? settings.soundOn : true;
})();

// zustand https://github.com/pmndrs/zustand
// with typescript https://react-tracked.js.org/docs/tutorial-zustand-01/
export const useStore = create<GlobalStateType>(
  (set): GlobalStateType => ({
    isTooltipMaximized: false,
    paused: false,
    soundOn: initialSoundOn,
    isPropertyAnimating: false,
    targetVirusIdx: 0,
    waveStartTime: null,
    cellButtonIdx: 0,
    pointerDownStartTime: null,
    absCreatedSincePointerDown: 0,
    viruses: [],
    antibodies: [],
    createVirus: (newVir) =>
      set((state) => ({ viruses: [...state.viruses, newVir] })),
    createAntibody: (newAb) =>
      set((state) => ({ antibodies: [...state.antibodies, newAb] })),
    playerHp: INITIAL_PLAYER_HP,
    showHp: true,
    started: startsStarted,
    worldRadius: 5,
    isWaveComplete: false,
    currentWaveIdx: 0,
    numDefeatedViruses: 0,
    incrementNumDefeatedViruses: () =>
      set((state) => ({ numDefeatedViruses: state.numDefeatedViruses + 1 })),
    temperature: 1,
    ceilingHeight: INITIAL_CEILING_HEIGHT,
    scale: MAX_SCALE,
    setScale: (newValue) => set(() => ({ scale: newValue })),
    setTemperature: (newValue) => set(() => ({ temperature: newValue })),
    selectedProtein: null as null | SelectedProtein,
    setSelectedProtein: (selectedProtein) => set(() => ({ selectedProtein })),
    set: (newState) => set((state) => ({ ...state, ...newState })),
  })
);
