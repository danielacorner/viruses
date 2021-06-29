import React, { useRef } from "react";
import { useStore } from "../../store";
import { useScalePercent } from "../useScalePercent";
import { useFrame } from "@react-three/fiber";

// slow down rotation time
const mu = 0.8;

const MAX_TEMPERATURE = 5;
const MIN_TEMPERATURE = 0;

export function IcosahedronBackground() {
  const scalePct = useScalePercent();

  const temperature = useStore((s) => s.temperature);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useFrame(({ clock }) => {
    // temperature in range: 0-1
    const temperatureNormalized =
      (temperature - MIN_TEMPERATURE) / (MAX_TEMPERATURE - MIN_TEMPERATURE);

    // rotation speeds up with temperature
    const time = mu * temperatureNormalized ** 2 * clock.getElapsedTime();

    ref1.current.rotation.x = Math.sin(time / 4);
    ref1.current.rotation.y = Math.sin(time / 3);

    ref2.current.rotation.x = Math.sin(time / 5);
    ref2.current.rotation.y = Math.sin(time / 2);

    ref3.current.rotation.x = Math.sin(time / 6);
    ref3.current.rotation.y = Math.sin(time / 2.5);
  });

  return (
    <>
      <mesh ref={ref1}>
        <icosahedronBufferGeometry args={[scalePct * 100, 4]} />
        <meshPhysicalMaterial
          color="rebeccapurple"
          opacity={0.018}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
      <mesh ref={ref2}>
        <icosahedronBufferGeometry args={[scalePct * 300, 5]} />
        <meshPhysicalMaterial
          color="rebeccapurple"
          opacity={0.015}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
      <mesh ref={ref3}>
        <icosahedronBufferGeometry args={[scalePct * 600, 6]} />
        <meshPhysicalMaterial
          color="rebeccapurple"
          opacity={0.012}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
    </>
  );
}
