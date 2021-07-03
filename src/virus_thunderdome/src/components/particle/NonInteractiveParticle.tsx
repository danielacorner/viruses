import React, { useRef } from "react";
import { useJitterRefParticle } from "../Physics/useJitterParticle";
import { useStore } from "../../store";

/** doesn't interact with other particles (passes through them) */
export function NonInteractiveParticle({
  pathToGLTF,
  mass,
  position,
  Component,
  numIcosahedronFaces,
  pathToImage,
}) {
  const ref = useRef();
  useJitterRefParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);

  return (
    <mesh
      frustumCulled={true}
      renderOrder={3}
      ref={ref}
      scale={[scale, scale, scale]}
      position={position}
    >
      <Component />
    </mesh>
  );
}
