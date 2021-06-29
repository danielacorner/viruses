import { useEffect, useRef } from "react";
import { useStore } from "../../store";
import { INITIAL_CAMERA_POSITION } from "../../utils/constants";
import { WAVES } from "../Game/WAVES";

export function useCameraY() {
  const currentWaveIdx = useStore((state) => state.currentWaveIdx);
  const prevWave = currentWaveIdx === 0 ? null : WAVES[currentWaveIdx - 1];
  const newCamY = prevWave?.moveCameraTo?.[1];
  const prevY = useRef(INITIAL_CAMERA_POSITION[1]);
  const newY = newCamY ? -newCamY / 2 : prevY.current;
  useEffect(() => {
    if (newY) {
      prevY.current = newY;
    }
  });
  return newY;
}
