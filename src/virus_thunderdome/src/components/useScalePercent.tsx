import { useStore } from "../store";
import { MAX_SCALE, MIN_SCALE } from "../utils/constants";

export function useScalePercent() {
  const scale = useStore((s) => s.scale);
  return (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
}
