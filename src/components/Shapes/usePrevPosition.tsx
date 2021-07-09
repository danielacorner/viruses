import { useRef } from "react";
import { useMount } from "../../utils/utils";

export function usePrevPosition(api) {
  const prevPosition = useRef([0, 0, 0]);
  useMount(() =>
    api.position.subscribe((p) => {
      prevPosition.current = p;
    })
  );
  return prevPosition;
}
export function usePrevRotation(api) {
  const prevRotation = useRef([0, 0, 0]);
  useMount(() =>
    api.rotation.subscribe((p) => {
      prevRotation.current = p;
    })
  );
  return prevRotation;
}
