import { useFrame } from "@react-three/fiber";
import { randBetween } from "../../utils/utils";
import * as THREE from "three";
import { useVelocity } from "./useVelocity";
import { scaleAtom, useStore } from "../../store";
import { useAtom } from "jotai";
import { usePrevPosition, usePrevRotation } from "./usePrevPosition";
import { MAX_SCALE, MIN_SCALE } from "../../utils/constants";

export function useJitterRefParticle({ mass, ref }) {
  const { velocity } = useVelocity(mass);
  const paused = useStore((s) => s.paused);
  const [scale, setScale] = useAtom(scaleAtom);
  // ? ONLY when the temperature changes, change the velocity

  const jitterPosition = velocity * POSITION_JITTER_COEFF * scale ** 3; // position changes with scale^3
  const jitterRotation = velocity * ROTATION_JITTER_COEFF; // rotation doesn't change with scale
  const rPos = () => randBetween(-jitterPosition, jitterPosition, true);
  const rRot = () => randBetween(-jitterRotation, jitterRotation, true);

  useFrame(() => {
    if (paused || !ref.current) {
      return;
    }
    // jitter position
    const { x, y, z } = ref.current.position;
    ref.current.position.x = ref.current.position.x + rPos();
    ref.current.position.y = ref.current.position.y + rPos();
    ref.current.position.z = ref.current.position.z + rPos();

    // jitter rotation
    const { x: rx, y: ry, z: rz } = ref.current.position;
    ref.current.rotation.x = ref.current.rotation.x + rRot();
    ref.current.rotation.y = ref.current.rotation.y + rRot();
    ref.current.rotation.z = ref.current.rotation.z + rRot();
  });
}

const FORCE = 0.0005;
const DISTANCE_FROM_PARTICLE = 1;

export function useJitterPhysicsParticle({
  ref,
  api,
  mass,
}: {
  ref: any;
  api: any;
  mass: any;
  // api: { [property: string]: WorkerVec };
}) {
  const paused = useStore((s) => s.paused);
  // ? ONLY when the temperature changes, change the velocity

  const prevPosition = usePrevPosition(api);

  const [scale] = useAtom(scaleAtom);
  const { rPos } = useGetJitterPositions(mass);

  // seems too jittery at > half scale
  const scaledHalfwayUp = scale < (MAX_SCALE - MIN_SCALE) / 2;
  useFrame(() => {
    if (
      paused ||
      !api.position ||
      !ref.current ||
      !prevPosition.current ||
      scaledHalfwayUp
    ) {
      return;
    }
    // jitter position
    const [x, y, z] = prevPosition.current.map((xyz) => xyz + rPos() * 30);
    api.position.set(x, y, z);

    // jitter rotation
    // const [rx, ry, rz] = prevRotation.current.map(
    //   (rxyz) => rxyz + rRot() * 0.000001
    // );
    // api.rotation.set(rx, ry, rz);
  });
}

const ROTATION_JITTER_COEFF = 0.05;
const POSITION_JITTER_COEFF = 100;

function useGetJitterPositions(mass) {
  const { velocity } = useVelocity(mass);
  const [scale, setScale] = useAtom(scaleAtom);
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
  useFrame(() => {
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
