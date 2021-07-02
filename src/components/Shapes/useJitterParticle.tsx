import { Quaternion, useFrame } from "@react-three/fiber";
import { randBetween, useMount } from "../../utils/utils";
import * as THREE from "three";
import { useVelocity } from "./useVelocity";
import { useStore } from "../../store";
import { useRef } from "react";
let frameIdx = 0;
const FORCE = 0.0000005;
const distanceFromParticle = 0;
const MAX_ANGULAR_VELOCITY = 8;

// api
type WorkerVec = {
  set: (x: number, y: number, z: number) => void;
  copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => void;
  subscribe: (callback: (value: number[]) => void) => void;
};
export function useJitterParticle({ mass, ref, api = {} as any | WorkerVec }) {
  const paused = useStore((s) => s.paused);
  // ? ONLY when the temperature changes, change the velocity

  const { rPos, rRot } = useGetJitterPositions(mass);

  // const currentAngularVelocity = useRef([0, 0, 0, 0] as Quaternion);
  // useMount(() =>
  //   api.angularVelocity.subscribe((q) => (currentAngularVelocity.current = q))
  // );

  useFrame(() => {
    frameIdx++;
    if (paused || !api.position) {
      return;
    }
    if (ref.current) {
      const impulseAmount = Math.random() * FORCE;
      const impulse = [
        (Math.random() - 0.5) * impulseAmount,
        (Math.random() - 0.5) * impulseAmount,
        (Math.random() - 0.5) * impulseAmount,
      ];
      const worldPoint = [
        ref.current.position.x + (Math.random() - 0.5) * distanceFromParticle,
        ref.current.position.y + (Math.random() - 0.5) * distanceFromParticle,
        ref.current.position.z + (Math.random() - 0.5) * distanceFromParticle,
      ];

      // TODO every so often, clamp the angular velocity
      // if (frameIdx % 60 === 0) {
      //   console.log(
      //     "🌟🚨 ~ useFrame ~ api.angularVelocity",
      //     api.angularVelocity.copy()
      //   );
      //   api.angularVelocity.set(
      //     //     // ...currentAngularVelocity.current.map((q) => q)
      //     ...api.angularVelocity
      //       .copy()
      //       .map((q) =>
      //         Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, q))
      //       )
      //   );
      // }
      // clamp angular velocity
      // api.angularVelocity.set(
      //   //     // ...currentAngularVelocity.current.map((q) => q)
      //   ...currentAngularVelocity.current.map((q) =>
      //     Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, q))
      //   )
      // );

      // jitter position
      api.applyForce(impulse, worldPoint);
      // api.applyImpulse(impulse, worldPoint);
      // const { x, y, z } = ref.current.position;
      // api.position.set(...[x, y, z].map((p) => p + rPos()));
      // ref.current.position.x = ref.current.position.x + rPos();
      // ref.current.position.y = ref.current.position.y + rPos();
      // ref.current.position.z = ref.current.position.z + rPos();

      // jitter rotation
      // const { x: rx, y: ry, z: rz } = ref.current.position;
      // api.rotation.set(...[rx, ry, rz].map((r) => r + rRot()));
      // ref.current.rotation.x = ref.current.rotation.x + rRot();
      // ref.current.rotation.y = ref.current.rotation.y + rRot();
      // ref.current.rotation.z = ref.current.rotation.z + rRot();
    }
  });
}

const ROTATION_JITTER_COEFF = 0.05;
const POSITION_JITTER_COEFF = 100;

function useGetJitterPositions(mass) {
  const { velocity } = useVelocity(mass);
  const scale = useStore((s) => s.scale);
  // ? ONLY when the temperature changes, change the velocity

  const jitterPosition = velocity * POSITION_JITTER_COEFF * scale ** 3; // position changes with scale^3
  const jitterRotation = velocity * ROTATION_JITTER_COEFF; // rotation doesn't change with scale
  const rPos = () => randBetween(-jitterPosition, jitterPosition, true);
  const rRot = () => randBetween(-jitterRotation, jitterRotation, true);
  return { rPos, rRot };
}

const dummy = new THREE.Object3D();

export function useJitterInstanceParticle({
  jitterRotation = 0.01,
  jitterPosition = 0.01,
  numParticles,
  ref,
}) {
  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    let i = 0;
    const rPos = () => randBetween(-jitterPosition, jitterPosition);
    const rRot = () => randBetween(-jitterRotation, jitterRotation);
    for (let idx = 0; idx < numParticles; idx++) {
      // jitter rotation
      dummy.rotation.x = dummy.rotation.x + rRot();
      dummy.rotation.y = dummy.rotation.y + rRot();
      dummy.rotation.z = dummy.rotation.z + rRot();
      // jitter position
      const { x, y, z } = ref.current.position;
      dummy.position.set(x + rPos(), y + rPos(), z + rPos());
      dummy.updateMatrix();
      ref.current.setMatrixAt(i++, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
}
