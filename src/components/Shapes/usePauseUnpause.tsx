import { useMount } from "../../utils/utils";
import { useStore } from "../../store";
import { useEffect, useRef } from "react";

type Vector = [number, number, number];
type Quaternion = [number, number, number, number];

export function usePauseUnpause({ api, instanced = false, numInstances = 0 }) {
  // current particle velocity
  const currentVelocity = useRef([0, 0, 0] as Vector);
  useMount(
    () =>
      !instanced && api.velocity.subscribe((v) => (currentVelocity.current = v))
  );
  const currentAngularVelocity = useRef([0, 0, 0, 0] as Quaternion);
  useMount(
    () =>
      !instanced &&
      api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
  );

  const paused = useStore((s) => s.paused);
  // when we pause, remember the last velocity & angularVelocity
  // when we unpause, resume the last velocity & angularVelocity
  const lastVelocity = useRef(null as null | Vector);
  const lastangularVelocity = useRef(null as null | Quaternion);

  // non-instanced pause/unpause
  useEffect(() => {
    if (instanced) {
      return;
    }
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

  // TECHDEBT: not working?
  // instanced pausing (don't bother with unpausing)
  useEffect(() => {
    if (instanced && paused) {
      // https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88?file=/src/index.js:602-605
      [...new Array(numInstances)].forEach((_, idx) => {
        api.at(idx).velocity.set(0, 0, 0);
        api.at(idx).angularVelocity.set(0, 0, 0, 0);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);
}
