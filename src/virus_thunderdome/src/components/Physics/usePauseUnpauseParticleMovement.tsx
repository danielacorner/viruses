import { useMount } from "../../utils/utils";
import { useStore } from "../../store";
import { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Quaternion, Vector } from "../../types";
import { MAX_SCALE, MIN_SCALE } from "../../utils/constants";
import { usePrevious } from "../../utils/hooks";

// ! subscriptions cause errors when we remove physics bodies https://github.com/pmndrs/use-cannon/issues/115
// function usePauseUnpauseParticleMovement({
//   api,
//   instanced = false,
//   numInstances = 0,
// }) {
//   // const budgeTemperature = useBudgeTemperature();
//   const scale = useStore((s) => s.scale);
//   //  when scale increases, max velocity decreases
//   const scalePct = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
//   // cap maximum particle velocity
//   const maxVelocity = 30 - scalePct ** 2;

//   // const currentVelocity = useRef([0, 0, 0] as Vector);
//   // useMount(
//   //   () =>
//   //     !instanced && api.velocity.subscribe((v) => (currentVelocity.current = v))
//   // );
//   // const currentAngularVelocity = useRef([0, 0, 0, 0] as Quaternion);
//   // useMount(
//   //   () =>
//   //     !instanced &&
//   //     api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
//   // );

//   const paused = useStore((s) => s.paused);
//   // when we pause, remember the last velocity & angularVelocity
//   // when we unpause, resume the last velocity & angularVelocity
//   // const lastVelocity = useRef(null as null | Vector);
//   // const lastangularVelocity = useRef(null as null | Quaternion);
//   const wasPaused = usePrevious(paused);

//   // non-instanced pause/unpause
//   useFrame(() => {
//     if (instanced) {
//       return;
//     }

//     // currentVelocity.current.forEach((v) => {
//     //   if (v / maxVelocity > 0.8) {
//     //   }
//     // });
//     // if (currentVelocity.current)
//     //   if (
//     //     currentVelocity.current.find((v) => v < -maxVelocity || v > maxVelocity)
//     //   ) {
//     //     api.velocity.set(
//     //       ...currentVelocity.current.map((v) =>
//     //         // cap it at + or - maxVelocity
//     //         v > maxVelocity ? maxVelocity : v < -maxVelocity ? -maxVelocity : v
//     //       )
//     //     );
//     //   }

//     // const wasPaused = lastVelocity.current?.[0];

//     if (paused) {
//       // memorize last non-zero velocity
//       // if (
//       //   currentVelocity.current?.[0] ||
//       //   currentVelocity.current?.[1] ||
//       //   currentVelocity.current?.[2]
//       // ) {
//       //   lastVelocity.current = currentVelocity.current;
//       //   lastangularVelocity.current = currentAngularVelocity.current;
//       // }
//       // prevent movement
//       api.velocity.set(0, 0, 0);
//       api.angularVelocity.set(0, 0, 0, 0);
//       // api.linearDamping.set(1);
//       // api.angularDamping.set(1);
//     } else if (!paused && wasPaused && api) {
//       // allow movement
//       // api.linearDamping.set(0);
//       // api.angularDamping.set(0);
//       // unpause
//       // api.velocity.set(...lastVelocity.current);
//       // api.angularVelocity.set(...lastangularVelocity.current);
//       // lastVelocity.current = null;
//       // budge temperature to "unpause" velocities
//       // budgeTemperature();
//     }
//   });

//   // TECHDEBT: not working?
//   // instanced pausing (don't bother with unpausing)
//   // useEffect(() => {
//   //   if (instanced && paused) {
//   //     // https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88?file=/src/index.js:602-605
//   //     [...new Array(numInstances)].forEach((_, idx) => {
//   //       api.at(idx).velocity.set(0, 0, 0);
//   //       api.at(idx).angularVelocity.set(0, 0, 0, 0);
//   //     });
//   //   }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [paused]);
// }

// function useCurrentVelocity(api, instanced = false) {
//   // current particle velocity
//   const currentVelocity = useRef([0, 0, 0] as Vector);
//   useMount(
//     () =>
//       !instanced && api.velocity.subscribe((v) => (currentVelocity.current = v))
//   );
//   return currentVelocity.current;
// }

// function useBudgeTemperature() {
//   const set = useStore((s) => s.set);
//   const temperature = useStore((s) => s.temperature);

//   return () => {
//     set({ temperature: temperature + Math.random() * 0.0001 });
//   };
// }
