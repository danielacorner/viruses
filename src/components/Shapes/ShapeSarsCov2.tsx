import React, { Suspense } from "react";
import { useSphere } from "@react-three/cannon";
import SarsCov2Suspense from "../GLTFs/SarsCov2";
import { useJitterParticle } from "./useJitterParticle";

export function ShapeSarsCov2({ position, ...rest }) {
  const scale = 0.015;

  const [mesh] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position,
    // position: position.map((xyz) => xyz * worldSize),
  }));

  const particle = useJitterParticle();

  return (
    <mesh {...rest} ref={mesh}>
      <group ref={particle}>
        {/* <boxBufferGeometry attach="geometry" /> */}
        <Suspense fallback={null}>
          <SarsCov2Suspense
            attach="material"
            // ref={idx === 0 ? ref : null}
            scale={[scale, scale, scale]}
            rotation={mesh.current?.rotation}
            // position={[0, 0, 0]}
          />
        </Suspense>
      </group>
    </mesh>
  );
}
