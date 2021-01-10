import { useMount } from "../../utils/utils";
import { useStore } from "../../store";
import { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";

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
  useFrame(() => {
    if (instanced) {
      return;
    }
    const wasPaused = lastVelocity.current?.[0];

    if (paused && !wasPaused) {
      // memorize last non-zero velocity
      if (
        currentVelocity.current?.[0] ||
        currentVelocity.current?.[1] ||
        currentVelocity.current?.[2]
      ) {
        lastVelocity.current = currentVelocity.current;
        lastangularVelocity.current = currentAngularVelocity.current;
      }
      // prevent movement
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0, 0);
      api.linearDamping.set(1);
      api.angularDamping.set(1);
    } else if (!paused && wasPaused) {
      // allow movement
      api.linearDamping.set(0);
      api.angularDamping.set(0);
      // unpause
      api.velocity.set(...lastVelocity.current);
      api.angularVelocity.set(...lastangularVelocity.current);
      lastVelocity.current = null;
    }
  });

  // TECHDEBT: not working?
  // instanced pausing (don't bother with unpausing)
  // useEffect(() => {
  //   if (instanced && paused) {
  //     // https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88?file=/src/index.js:602-605
  //     [...new Array(numInstances)].forEach((_, idx) => {
  //       api.at(idx).velocity.set(0, 0, 0);
  //       api.at(idx).angularVelocity.set(0, 0, 0, 0);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paused]);
}
