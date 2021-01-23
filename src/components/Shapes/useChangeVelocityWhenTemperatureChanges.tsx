import { eitherOr } from "../../utils/utils";
import { useEffect } from "react";
import { useVelocity } from "./useVelocity";
import { useStore } from "../../store";
import { Quaternion, Vector } from "../../types";

export function useChangeVelocityWhenTemperatureChanges({
  mass,
  api,
  instanced = false,
}) {
  const { temperature, velocity } = useVelocity(mass);
  console.log("🌟🚨 ~ velocity", velocity);
  const scale = useStore((s) => s.scale);
  // current particle velocity

  // ! api.subscribe causes errors when adding bodies https://github.com/pmndrs/use-cannon/issues/115
  // const currentVelocity = useRef([0, 0, 0] as Vector);
  // useMount(
  //   () =>
  //     !instanced && api.velocity.subscribe((v) => (currentVelocity.current = v))
  // );
  // const currentAngularVelocity = useRef([0, 0, 0, 0] as Quaternion);
  // useMount(
  //   () =>
  //     !instanced &&
  //     api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
  // );

  // set particle velocity based on temperature
  // ? should velocity randomly change (including direction) whenever you change the temperature
  useEffect(() => {
    if (temperature === 0) {
      return;
    }
    const newVelocity = [0, 0, 0].map(() => velocity * eitherOr(-1, 1));
    console.log("🌟🚨 ~ useEffect ~ newVelocity", newVelocity);
    api.velocity.set(...newVelocity) as Vector;

    // ? should angular velocity change (including direction) whenever you change the temperature

    const newAngularVelocity = [0, 0, 0, 0].map(
      () => velocity * eitherOr(-1, 1)
    ) as Quaternion;
    api.angularVelocity.set(...newAngularVelocity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature, scale]);
}

// function useChangeTemperatureWhenScaleChanges() {
//   const set = useStore((s) => s.set);
//   const scale = useStore((s) => s.scale);
//   const temperature = useStore((s) => s.temperature);
//   const prevScale = usePrevious(scale);

//   useEffect(() => {
//     if (!prevScale) {
//       return;
//     }
//     // ? velocity randomly changes (including direction) whenever you change the temperature
//     const ratio = (scale / (prevScale || scale)) ** 3;
//     const newTemperature = temperature * ratio;
//     set({ temperature: newTemperature });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [temperature]);
// }

// function useChangeVelocityWhenScaleChanges({ mass, api, instanced = false }) {
//   const scale = useStore((s) => s.scale);
//   // current particle velocity
//   const currentVelocity = useRef([0, 0, 0] as Vector);
//   useMount(
//     () =>
//       !instanced && api.velocity.subscribe((v) => (currentVelocity.current = v))
//   );
//   const currentAngularVelocity = useRef([0, 0, 0, 0] as Quaternion);
//   useMount(
//     () =>
//       !instanced &&
//       api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
//   );
//   const prevScale = usePrevious(scale);

//   useEffect(() => {
//     if (!prevScale) {
//       return;
//     }
//     // increase velocity when zoom decreases (so we don't build up "pressure")
//     const ratio = (scale / (prevScale || scale)) ** 3;
//     const newVelocity = currentVelocity.current.map(
//       (v) => v * ratio
//       // (v) => velocity * eitherOr(-1, 1) * 10
//     );
//     api.velocity.set(...newVelocity);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [scale]);
// }
