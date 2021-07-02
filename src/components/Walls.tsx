import React from "react";
import { useStore } from "../store";
import { ScaleIndicator } from "./ScaleIndicator";
import { Plane } from "./Shapes/Plane";
import { useScalePercent } from "./useScalePercent";
// const colors = niceColors[17];
const colors = ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"];

// https://www.npmjs.com/package/nice-color-palettes
// https://raw.githubusercontent.com/Jam3/nice-color-palettes/HEAD/visualize/1000.png
// const palette = niceColors[6]; // e.g. => [ "#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900" ]
export function Walls() {
  const worldRadius = useStore((state) => state.worldRadius);
  // const palette = ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"];
  const walls = [
    // {/* behind (back wall) */}
    {
      rotation: [0 * Math.PI, 0, 0],
      color: colors[1],
      position: [0, -0, -worldRadius],
    },
    // {/* in front (camera-side) */}
    {
      rotation: [0, -1 * Math.PI, 0],
      color: colors[1],
      position: [0, -0, worldRadius],
      reflect: true,
    },
    // {/* left */}
    {
      rotation: [0, 0.5 * Math.PI, 0],
      color: colors[1],
      position: [-worldRadius, 0, 0],
    },
    // {/* right */}
    {
      rotation: [0, -0.5 * Math.PI, 0],
      color: colors[2],
      position: [worldRadius, -0, 0],
    },
    // {/* floor */}
    {
      rotation: [-0.5 * Math.PI, 0, 0],
      color: colors[1],
      position: [0, -worldRadius, 0],
    },
    // {/* ceiling */}
    {
      rotation: [0.5 * Math.PI, 0, 0],
      color: colors[1],
      position: [0, worldRadius, 0],
    },
  ];
  const scalePct = useScalePercent();

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
      <mesh>
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
      </mesh>
      <ScaleIndicator />
    </>
  );
}
