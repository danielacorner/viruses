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
import Model1bv1 from "./GLTFs/1bv1";

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
    max: 50,
    value: 10,
  });
  const worldRadius = useStore((state) => state.worldRadius);

  const proteins = [
    {
      particle: SarsCov2,
      scale: 0.005,
      positions: getRandPositionsArr(numParticles, worldRadius / 2),
    },
    {
      particle: Model1bv1,
      scale: 0.005,
      positions: getRandPositionsArr(numParticles, worldRadius / 2),
    },
    {
      particle: ModelActivatorProtein,
      scale: 0.005,
      positions: getRandPositionsArr(numParticles, worldRadius / 2),
    },
  ];
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
        {proteins.map(({ particle, scale, positions }, idx) => (
          <React.Fragment key={idx}>
            {positions.map((pos) => (
              // instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
              // <instancedMesh key={JSON.stringify(pos)}>
              <instancedMesh key={JSON.stringify(pos)}>
                <JitteryParticle
                  // key={JSON.stringify(pos)}
                  ChildParticle={particle}
                  position={pos}
                  scale={0.005}
                />
              </instancedMesh>
            ))}
          </React.Fragment>
        ))}
        <Walls />
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

export default Scene;
