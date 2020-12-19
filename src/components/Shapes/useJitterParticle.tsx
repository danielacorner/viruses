import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { randBetween } from "../../utils/utils";

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
