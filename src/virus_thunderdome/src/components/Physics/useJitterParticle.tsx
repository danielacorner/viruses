import { useFrame } from "react-three-fiber";
import { randBetween } from "../../utils/utils";
import * as THREE from "three";
import { useVelocity } from "./useVelocity";
import { useStore } from "../../store";

// api
type WorkerVec = {
  set: (x: number, y: number, z: number) => void;
  copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => void;
  subscribe: (callback: (value: number[]) => void) => void;
};
const ROTATION_JITTER_COEFF = 0.05;
const POSITION_JITTER_COEFF = 100;
export function useJitterParticle({ mass, ref, api = {} as any | WorkerVec }) {
  const { velocity } = useVelocity(mass);
  const paused = useStore((s) => s.paused);
  const scale = useStore((s) => s.scale);
  // ? ONLY when the temperature changes, change the velocity

  const jitterPosition = velocity * POSITION_JITTER_COEFF * scale ** 3; // position changes with scale^3
  const jitterRotation = velocity * ROTATION_JITTER_COEFF; // rotation doesn't change with scale
  const rPos = () => randBetween(-jitterPosition, jitterPosition, true);
  const rRot = () => randBetween(-jitterRotation, jitterRotation, true);

  useFrame(() => {
    if (paused || !api.position) {
      return;
    }
    if (ref.current) {
      // jitter position
      const { x, y, z } = ref.current.position;
      api.position.set(...[x, y, z].map((p) => p + rPos()));
      // ref.current.position.x = ref.current.position.x + rPos();
      // ref.current.position.y = ref.current.position.y + rPos();
      // ref.current.position.z = ref.current.position.z + rPos();

      // jitter rotation
      const { x: rx, y: ry, z: rz } = ref.current.position;
      api.rotation.set(...[rx, ry, rz].map((r) => r + rRot()));
      // ref.current.rotation.x = ref.current.rotation.x + rRot();
      // ref.current.rotation.y = ref.current.rotation.y + rRot();
      // ref.current.rotation.z = ref.current.rotation.z + rRot();
    }
  });
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
