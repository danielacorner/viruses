import { randBetween, useMount } from "../../utils/utils";
import { useEffect } from "react";
import { usePhysicsProps } from "./usePhysicsProps";
import { useStore } from "../../store";

export function useChangeVelocityWhenTemperatureChanges({ mass, api }) {
  const { temperature, velocityByMass } = usePhysicsProps(mass);
  const set = useStore((s) => s.set);

  useEffect(() => {
    let [newVx, newVy, newVz] =
      temperature === 0
        ? [0, 0, 0]
        : [
            velocityByMass * randBetween(-1, 1),
            velocityByMass * randBetween(-1, 1),
            velocityByMass * randBetween(-1, 1),
          ];

    api.velocity.set(newVx, newVy, newVz);

    // unpause if it was paused
    set({ paused: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);
}
