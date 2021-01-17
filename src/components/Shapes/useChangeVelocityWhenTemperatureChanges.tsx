import { randBetween, useMount } from "../../utils/utils";
import { useEffect, useRef } from "react";
import { usePhysicsProps } from "./usePhysicsProps";
import { useStore } from "../../store";
import { Quaternion, Vector } from "../../types";
import { usePrevious } from "../../utils/hooks";

const VELOCITY_PER_TEMP = 10;

export function useChangeVelocityWhenTemperatureChanges({
  mass,
  api,
  instanced = false,
}) {
  const { temperature, velocity } = usePhysicsProps(mass);
  console.log("🌟🚨🌟🚨🌟🚨🌟🚨🌟🚨🌟🚨 ~ temperature", temperature);
  const set = useStore((s) => s.set);
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

  useEffect(() => {
    // ? velocity randomly changes (including direction) whenever you change the temperature

    const newVelocity = currentVelocity.current.map(
      (v) => velocity * randBetween(-1, 1)
    );
    api.velocity.set(...newVelocity);

    // ? angular velocity changes (including direction) whenever you change the temperature

    const newAngularVelocity = currentAngularVelocity.current.map(
      (v) => velocity * randBetween(-1, 1)
    );
    api.angularVelocity.set(...newAngularVelocity);

    // unpause if it was paused
    set({ paused: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);
}
export function useSetVelocityLowInitially({ mass, api, instanced = false }) {
  const { velocity } = usePhysicsProps(mass);
  // current particle velocity

  useMount(() => {
    // set velocity low initially
    setTimeout(() => {
      const newVelocity = [...new Array(3)].map(
        (_) => velocity * randBetween(-1, 1)
      );
      api.velocity.set(...newVelocity);

      // set angular velocity low initially

      const newAngularVelocity = [...new Array(3)].map(
        (_) => velocity * randBetween(-1, 1)
      );
      api.angularVelocity.set(...newAngularVelocity);
    }, 5000);
  });
}

export function useChangeTemperatureWhenScaleChanges() {
  const set = useStore((s) => s.set);
  const scale = useStore((s) => s.scale);
  const temperature = useStore((s) => s.temperature);
  const prevScale = usePrevious(scale);

  useEffect(() => {
    if (!prevScale) {
      return;
    }
    // ? velocity randomly changes (including direction) whenever you change the temperature
    const ratio = (scale / (prevScale || scale)) ** 3;
    const newTemperature = temperature * ratio;
    set({ temperature: newTemperature });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);
}

export function useChangeVelocityWhenScaleChanges({
  mass,
  api,
  instanced = false,
}) {
  const scale = useStore((s) => s.scale);
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
  const prevScale = usePrevious(scale);

  useEffect(() => {
    if (!prevScale) {
      return;
    }
    // ? velocity randomly changes (including direction) whenever you change the temperature
    const ratio = (scale / (prevScale || scale)) ** 3;
    const newVelocity = currentVelocity.current.map(
      (v) => v * ratio
      // (v) => velocity * randBetween(-1, 1) * 10
    );
    api.velocity.set(...newVelocity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);
}
