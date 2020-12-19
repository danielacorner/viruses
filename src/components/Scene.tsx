import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Covid } from "./Shapes/Covid";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { randBetween } from "../utils/utils";
import { Plane } from "./Shapes/Plane";

const Scene = () => {
  const numParticles = useControl("particles", {
    type: "number",
    min: 1,
    max: 100,
    value: 2,
  });
  const positions = [...new Array(Math.ceil(numParticles))].map((_, idx) => [
    randBetween(-10, 10),
    randBetween(-10, 10),
    randBetween(-10, 10),
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
          <instancedMesh key={JSON.stringify(pos)}>
            <Covid position={pos} />
          </instancedMesh>
        ))}
        <OuterContainer />
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

export default Scene;

function OuterContainer() {
  return (
    <>
      {/* floor */}
      <Plane
        rotation={[-0.5 * Math.PI, 0, 0]}
        color={"#000000"}
        position={[0, -100, 0]}
      />
      {/* background */}
      <Plane
        rotation={[0 * Math.PI, 0, 0]}
        color={"#CA0000"}
        position={[0, 0, -100]}
      />
      {/* left wall */}
      <Plane
        rotation={[-0.5 * Math.PI, 0, -0.5 * Math.PI]}
        color={"#CAA000"}
        position={[-100, 0, 0]}
      />
    </>
  );
}
