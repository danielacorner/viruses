import React from "react";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { getRandStartPosition } from "../Shapes/particleUtils";
import { useStore } from "../../store";
import { useChangeVelocityWhenTemperatureChanges } from "../Physics/useChangeVelocityWhenTemperatureChanges";
const RADIUS = 0.05;
const NUM_INSTANCES = 50;

export function Water() {
  const worldRadius = useStore((state) => state.worldRadius);
  const selectedProtein = useStore((state) => state.selectedProtein);
  const mass = 18.0153 / 1000; /* 18.0153 daltons */
  const paused = useStore((s) => s.paused);
  const [ref, api] = useSphere((index) => ({
    mass: paused ? 0 : mass,
    position: getRandStartPosition(worldRadius),
    args: 1,
    material: {
      restitution: 0.0001,
    },
  }));
  useChangeVelocityWhenTemperatureChanges({
    mass,
    api,
    instanced: true,
    numParticles: NUM_INSTANCES,
  });
  return (
    <instancedMesh
      name="Water"
      ref={ref}
      receiveShadow
      args={[null, null, NUM_INSTANCES]}
      renderOrder={2}
    >
      <sphereBufferGeometry args={[RADIUS, 8, 8]} />
      <meshStandardMaterial
        color={new THREE.Color("#6f6dda")}
        transparent={true}
        opacity={selectedProtein ? 0.1 : 0.3}
      />
    </instancedMesh>
  );
}
