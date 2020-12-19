import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { randBetween } from "../utils/utils";
import { Walls } from "./Walls";
import { useStore } from "../store";
import JitteryParticle from "./Shapes/JitteryParticle";
import ModelActivatorProtein from "./GLTFs/activator_protein-1";
import SarsCov2 from "./GLTFs/SarsCov2";

const getRandStartPosition = (min, max) => [
  randBetween(min, max),
  randBetween(min, max),
  randBetween(min, max),
];

const getRandPositionsArr = (num, scalePosition) =>
  [...new Array(Math.ceil(num))].map((_, idx) =>
    getRandStartPosition(-scalePosition, scalePosition)
  );

const Scene = () => {
  const numParticles = useControl("particles", {
    type: "number",
    min: 1,
    max: 100,
    value: 10,
  });
  const worldSize = useStore((state) => state.worldSize);

  const positions = {
    covid: getRandPositionsArr(numParticles, worldSize),
    protein1: getRandPositionsArr(numParticles, worldSize),
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
          <instancedMesh key={JSON.stringify(pos)}>
            <JitteryParticle
              key={JSON.stringify(pos)}
              ChildParticle={SarsCov2}
              position={pos}
              scale={0.005}
            />
          </instancedMesh>
        ))}
        {positions.protein1.map((pos) => (
          // instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
          <instancedMesh key={JSON.stringify(pos)}>
            <JitteryParticle
              position={pos}
              ChildParticle={ModelActivatorProtein}
              scale={0.005}
            />
          </instancedMesh>
        ))}

        <Walls />
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

export default Scene;
