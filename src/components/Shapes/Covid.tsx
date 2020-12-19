import React, { useRef } from "react";
import { useSphere } from "@react-three/cannon";
import SarsCov2Suspense from "../GLTFs/SarsCov2";
import { useStore } from "../../store";
import { useFrame } from "react-three-fiber";
import { randBetween } from "../../utils/utils";

export function Covid({ position, ...rest }) {
  const covidScale = 0.015;

  const scale = useStore((state) => state.scale);

  const [mesh] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position: position.map((xyz) => xyz * scale),
  }));

  const group = useRef(null as any);

  const jitterRotation = 0.01;
  const jitterPosition = 0.01;

  useFrame(() => {
    if (group.current) {
      // jitter rotation
      group.current.rotation.x =
        group.current.rotation.x + randBetween(-jitterRotation, jitterRotation);
      group.current.rotation.y =
        group.current.rotation.y + randBetween(-jitterRotation, jitterRotation);
      group.current.rotation.z =
        group.current.rotation.z + randBetween(-jitterRotation, jitterRotation);

      // jitter position
      group.current.position.x =
        group.current.position.x + randBetween(-jitterPosition, jitterPosition);
      group.current.position.y =
        group.current.position.y + randBetween(-jitterPosition, jitterPosition);
      group.current.position.z =
        group.current.position.z + randBetween(-jitterPosition, jitterPosition);
    }
  });

  return (
    <mesh {...rest} ref={mesh}>
      <group ref={group}>
        {/* <boxBufferGeometry attach="geometry" /> */}
        <SarsCov2Suspense
          attach="material"
          // ref={idx === 0 ? ref : null}
          scale={[covidScale, covidScale, covidScale]}
          rotation={mesh.current?.rotation}
          // position={[0, 0, 0]}
        />
      </group>
    </mesh>
  );
}
