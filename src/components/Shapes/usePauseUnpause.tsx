import { useMount } from "../../utils/utils";
import { useStore } from "../../store";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Quaternion, Vector } from "../../types";

export function usePauseUnpause({ api, instanced = false, numInstances = 0 }) {
  // current particle velocity
  const scale = useStore((s) => s.scale);
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

    // max velocity decreases when scale increases
    const maxVelocity = 0.004 / scale ** 2;
    // cap maximum particle velocity
    if (
      currentVelocity.current.find((v) => v < -maxVelocity || v > maxVelocity)
    ) {
      api.velocity.set(
        ...currentVelocity.current.map((v) =>
          // cap it at + or - maxVelocity
          v > maxVelocity ? maxVelocity : v < -maxVelocity ? -maxVelocity : v
        )
      );
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
    } else if (!paused && wasPaused && api) {
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

function useCurrentVelocity(api, instanced = false) {
  // current particle velocity
  const currentVelocity = useRef([0, 0, 0] as Vector);
  useMount(
    () =>
      !instanced && api.velocity.subscribe((v) => (currentVelocity.current = v))
  );
  return currentVelocity.current;
}
