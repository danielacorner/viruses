import React from "react";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { getRandStartPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";
import { usePauseUnpause } from "./Shapes/usePauseUnpause";
const RADIUS = 0.05;
const NUM_INSTANCES = 50;

export function Water() {
  const worldRadius = useStore((state) => state.worldRadius);
  const mass = 18.0153 / 1000; /* 18.0153 daltons */
  const [ref, api] = useSphere((index) => ({
    mass,
    position: getRandStartPosition(worldRadius),
    args: 1,
    material: {
      restitution: 0,
    },
  }));
  // const scale = useStore(({ scale }) => scale * 500);
  usePauseUnpause({ api, instanced: true, numInstances: NUM_INSTANCES });

  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      args={[null, null, NUM_INSTANCES]}
      renderOrder={2}
    >
      <sphereBufferGeometry args={[RADIUS, 8, 8]} />
      <meshStandardMaterial
        color={new THREE.Color("#6f6dda")}
        transparent={true}
        opacity={0.3}
      />
    </instancedMesh>
  );
}
