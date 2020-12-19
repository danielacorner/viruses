import React, { Suspense } from "react";
import { useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";

export default function JitteryParticle({
  ChildParticle,
  scale,
  position,
  ...rest
}) {
  const [mesh] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position,
  }));

  const particle = useJitterParticle();

  return (
    <mesh {...rest} ref={mesh}>
      <group ref={particle}>
        {/* <boxBufferGeometry attach="geometry" /> */}
        <Suspense fallback={null}>
          <ChildParticle scale={[scale, scale, scale]} />
        </Suspense>
      </group>
    </mesh>
  );
}
