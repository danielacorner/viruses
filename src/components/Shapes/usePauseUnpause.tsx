import { useMount } from "../../utils/utils";
import { useStore } from "../../store";
import { useEffect, useRef } from "react";

type Vector = [number, number, number];
type Quaternion = [number, number, number, number];

export function usePauseUnpause({ mass, api }) {
  // current particle velocity
  const currentVelocity = useRef([0, 0, 0] as Vector);
  useMount(() => api.velocity.subscribe((v) => (currentVelocity.current = v)));
  const currentAngularVelocity = useRef([0, 0, 0, 0] as Quaternion);
  useMount(() =>
    api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
  );

  const paused = useStore((s) => s.paused);
  // when we pause, remember the last velocity & angularVelocity
  // when we unpause, resume the last velocity & angularVelocity
  const lastVelocity = useRef(null as null | Vector);
  const lastangularVelocity = useRef(null as null | Quaternion);
  // const lastVelocity = usePrevious(currentVelocity.current);
  useEffect(() => {
    if (paused) {
      lastVelocity.current = currentVelocity.current;
      lastangularVelocity.current = currentAngularVelocity.current;
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0, 0);
    } else {
      const wasPaused = lastVelocity.current?.[0];
      if (wasPaused) {
        // unpause
        api.velocity.set(...lastVelocity.current);
        api.angularVelocity.set(...lastangularVelocity.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);
}
