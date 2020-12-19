import React from "react";
import { useSphere } from "@react-three/cannon";
import SarsCov2Suspense from "../GLTFs/SarsCov2";
import { useStore } from "../../store";

export function Covid({ position, ...rest }) {
  const covidScale = 0.015;

  const scale = useStore((state) => state.scale);

  const [ref] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position: position.map((xyz) => xyz * scale),
  }));
  return (
    <mesh ref={ref} {...rest}>
      <boxBufferGeometry attach="geometry" />
      <SarsCov2Suspense
        attach="material"
        // ref={idx === 0 ? ref : null}
        scale={[covidScale, covidScale, covidScale]}
        position={[0, 0, 0]}
      />
    </mesh>
  );
}
