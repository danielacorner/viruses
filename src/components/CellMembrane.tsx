import React from "react";
import { Plane } from "./Shapes/Plane";
import { useStore } from "../store";
import { useGLTF } from "@react-three/drei";
import { useControl } from "react-three-gui";
import niceColors from "nice-color-palettes";
const colors = niceColors[17];
const CellMembrane = () => {
  const worldRadius = useStore((state) => state.worldRadius);
  // TODO: not working
  // const stuff = useGLTF("/models/other/cell_membrane.gltf");
  const { scene } = useGLTF("/models/antibodies/antibody_herpes.glb");
  // console.log("🌟🚨 ~ CellMembrane ~ stuff", stuff);
  // const { scene } = { scene: null };
  const scale = 0.2;
  // const scale = useControl("scale", {
  // 	type: "number",
  // 	min: 0,
  // 	max: 1,
  // 	value: 0.2,
  // });
  return (
    scene && (
      <group
        {...{
          position: [0, -worldRadius, 0],
        }}
      >
        <Plane
          {...{
            rotation: [-0.5 * Math.PI, 0, 0],
            color: colors[2],
          }}
          width={worldRadius * 2}
          height={worldRadius * 2}
        />
        <primitive
          object={scene}
          scale={[scale, scale, scale]}
          position={[
            0,
            0,
            // -worldRadius * scale * 5,
            // -worldRadius * scale,
            -worldRadius * scale,
          ]}
        />
      </group>
    )
  );
};

export default CellMembrane;
