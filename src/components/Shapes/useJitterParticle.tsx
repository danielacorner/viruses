import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { randBetween, useMount } from "../../utils/utils";
import * as THREE from "three";

const dummy = new THREE.Object3D();

export function useJitterInstanceParticle({
  jitterRotation = 0.01,
  jitterPosition = 0.01,
  numParticles,
}) {
  const ref = useRef(null as any);

  useMount(() => {
    if (!ref.current) {
      return;
    }
    dummy.position.set(0, 0, 0);
    ref.current.setMatrixAt(0, dummy.matrix);

    ref.current.instanceMatrix.needsUpdate = true;
  });

  useFrame((state) => {
    let i = 0;
    const rPos = () => randBetween(-jitterPosition, jitterPosition);
    const rRot = () => randBetween(-jitterRotation, jitterRotation);
    for (let x = 0; x < numParticles; x++) {
      const { x, y, z } = ref.current.position;
      // jitter rotation
      dummy.rotation.x = dummy.rotation.x + rRot();
      dummy.rotation.y = dummy.rotation.y + rRot();
      dummy.rotation.z = dummy.rotation.z + rRot();

      // jitter position
      dummy.position.set(x + rPos(), y + rPos(), z + rPos());

      dummy.updateMatrix();
      ref.current.setMatrixAt(i++, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return ref;
}

export function useJitterParticle({
  jitterRotation = 0.01,
  jitterPosition = 0.01,
} = {}) {
  const particle = useRef(null as any);

  useFrame(() => {
    if (particle.current) {
      // jitter rotation
      particle.current.rotation.x =
        particle.current.rotation.x +
        randBetween(-jitterRotation, jitterRotation);
      particle.current.rotation.y =
        particle.current.rotation.y +
        randBetween(-jitterRotation, jitterRotation);
      particle.current.rotation.z =
        particle.current.rotation.z +
        randBetween(-jitterRotation, jitterRotation);

      // jitter position
      particle.current.position.x =
        particle.current.position.x +
        randBetween(-jitterPosition, jitterPosition);
      particle.current.position.y =
        particle.current.position.y +
        randBetween(-jitterPosition, jitterPosition);
      particle.current.position.z =
        particle.current.position.z +
        randBetween(-jitterPosition, jitterPosition);
    }
  });
  return particle;
}
