import { useFrame } from "@react-three/fiber";
import { useMount } from "../../utils/utils";
import { useStore } from "../../store";
import { useRef } from "react";
import { FORCE } from "./useJitterParticle";
import { Vector3 } from "@react-three/fiber/dist/declarations/src/three-types";
let frameIdx = 0;
const MAX_ANGULAR_VELOCITY = 1;
const CLAMP_N_TIMES_PER_SECOND = 30; // impacts performance
const FPS = 30;

export function useClampAngularVelocity({ api }) {
  const currentAngularVelocity = useRef([0, 0, 0] as Vector3);
  const paused = useStore((s) => s.paused);
  useMount(() =>
    api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
  );

  useFrame(() => {
    frameIdx++;
    if (paused || !api) {
      return;
    }
    const impulseAmount = Math.random() * FORCE;
    const impulse = [
      (Math.random() - 0.5) * impulseAmount,
      (Math.random() - 0.5) * impulseAmount,
      (Math.random() - 0.5) * impulseAmount,
    ];

    // if ((frameIdx % FPS) / CLAMP_N_TIMES_PER_SECOND === 0) {
    const [x, y, z] = currentAngularVelocity.current.map((q) =>
      Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, q))
    );
    // clamp angular velocity
    api.angularVelocity.set(
      //     // ...currentAngularVelocity.current.map((q) => q)
      x,
      y,
      z
    );
    // }
  });
}
