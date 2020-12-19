import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Covid } from "./Shapes/Covid";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { randBetween } from "../utils/utils";
import { Walls } from "./Walls";
// import niceColors from "nice-color-palettes";

const Scene = () => {
  const worldSize = 10;
  const numParticles = useControl("particles", {
    type: "number",
    min: 1,
    max: 100,
    value: 10,
  });
  const positions = [...new Array(Math.ceil(numParticles))].map((_, idx) => [
    randBetween(-worldSize, worldSize),
    randBetween(-worldSize, worldSize),
    randBetween(-worldSize, worldSize),
  ]);
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
        {positions.map((pos) => (
          // instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
          // <instancedMesh key={JSON.stringify(pos)}>
          <Covid
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
