import React, { Suspense } from "react";
import { useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import Model1bv1 from "../GLTFs/1bv1";

export function Shape1bv1({ position, ...rest }) {
  const scale = 0.015;

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
          <Model1bv1
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
