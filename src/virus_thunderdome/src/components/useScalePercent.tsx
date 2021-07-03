import { useAtom } from "jotai";
import { scaleAtom } from "../../../store";
import { useStore } from "../store";
import { MAX_SCALE, MIN_SCALE } from "../utils/constants";

export function useScalePercent() {
  const [scale, setScale] = useAtom(scaleAtom);
  return (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
}
