import { useAtom } from "jotai";
import { scaleAtom, useStore } from "../store";
import { MAX_SCALE, MIN_SCALE } from "../utils/constants";

export function useScalePercent() {
  const [scale, setScale] = useAtom(scaleAtom);
  const scalePct = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
  return scalePct;
}
