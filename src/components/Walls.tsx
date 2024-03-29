import React from "react";
import { useStore } from "../store";
import { Plane } from "./Shapes/Plane";
import { useScalePercent } from "./useScalePercent";
import { ScaleIndicator } from "./ScaleIndicator";
import { useDetectGPU } from "@react-three/drei";
const colors = ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"];

export function Walls({ reflectAll = false }) {
  const { tier, isMobile } = useDetectGPU();
  const reflect = reflectAll || (tier >= 4 && !isMobile);
  const worldRadius = useStore((state) => state.worldRadius);
  const walls = [
    // {/* behind (back wall) */}
    {
      rotation: [0 * Math.PI, 0, 0],
      color: colors[1],
      position: [0, -0, -worldRadius],
      reflect,
    },
    // {/* in front (camera-side) */}
    {
      rotation: [0, -1 * Math.PI, 0],
      color: colors[1],
      position: [0, -0, worldRadius],
      // reflect,
    },
    // {/* left */}
    {
      rotation: [0, 0.5 * Math.PI, 0],
      color: colors[1],
      position: [-worldRadius, 0, 0],
      // reflect,
    },
    // {/* right */}
    {
      rotation: [0, -0.5 * Math.PI, 0],
      color: colors[2],
      position: [worldRadius, -0, 0],
      reflect,
    },
    // {/* floor */}
    {
      rotation: [-0.5 * Math.PI, 0, 0],
      color: colors[1],
      position: [0, -worldRadius, 0],
      reflect,
    },
    // {/* ceiling */}
    {
      rotation: [0.5 * Math.PI, 0, 0],
      color: colors[1],
      position: [0, worldRadius, 0],
      // reflect,
    },
  ];
  // const scalePct = useScalePercent();

  return (
    <>
      {walls.map((props, idx) => (
        <Plane
          {...props}
          key={idx}
          width={worldRadius * 2}
          height={worldRadius * 2}
        />
      ))}
      {/* <mesh>
				<icosahedronBufferGeometry args={[scalePct * 100, 5]} />
				<meshPhysicalMaterial
					color="rebeccapurple"
					opacity={0.014}
					transparent={true}
					depthTest={false}
					flatShading={true}
					roughness={0.4}
					vertexColors={true}
					reflectivity={1}
					wireframe={true}
				/>
			</mesh> */}
      <ScaleIndicator />
    </>
  );
}
