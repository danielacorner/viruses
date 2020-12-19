import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { randBetween } from "../utils/utils";
import { Walls } from "./Walls";
import { ShapeSarsCov2 } from "./Shapes/ShapeSarsCov2";
import { Shape1bv1 } from "./Shapes/Shape1bv1";
import { useStore } from "../store";
// import niceColors from "nice-color-palettes";

const Scene = () => {
  const numParticles = useControl("particles", {
    type: "number",
    min: 1,
    max: 100,
    value: 10,
  });
  const worldSize = useStore((state) => state.worldSize);
  const getRandStartPosition = (min, max) => [
    randBetween(min, max),
    randBetween(min, max),
    randBetween(min, max),
  ];
  const getRandPositionsArr = (num) =>
    [...new Array(Math.ceil(num))].map((_, idx) =>
      getRandStartPosition(-worldSize, worldSize)
    );

  const positions = {
    covid: getRandPositionsArr(numParticles),
    protein1: getRandPositionsArr(numParticles),
  };
  return (
    <>
      <OrbitControls />
      <Lighting />
      <Physics
        // iterations={20}
        // tolerance={0.0001}
        // defaultContactMaterial={{
        //   friction: 0.9,
        //   restitution: 0.7,
        //   contactEquationStiffness: 1e7,
        //   contactEquationRelaxation: 1,
        //   frictionEquationStiffness: 1e7,
        //   frictionEquationRelaxation: 2,
        // }}
        gravity={[0, 0, 0]}
        // allowSleep={false}
      >
        {/* <Plane /> */}
        {positions.covid.map((pos) => (
          // instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
          // <instancedMesh key={JSON.stringify(pos)}>
          <ShapeSarsCov2
            key={JSON.stringify(pos)}
            position={pos}
            width={1}
            height={1}
          />
        ))}
        {positions.protein1.map((pos) => (
          // instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
          // <instancedMesh key={JSON.stringify(pos)}>
          <Shape1bv1
            key={JSON.stringify(pos)}
            position={pos}
            width={1}
            height={1}
          />
        ))}

        <Walls />
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

export default Scene;
