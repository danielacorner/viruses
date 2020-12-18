import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Covid } from "./Covid";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { randBetween } from "../utils/utils";

const Scene = () => {
  const numParticles = useControl("particles", {
    type: "number",
    min: 1,
    max: 1000,
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
          <Covid position={pos} />
        ))}
      </Physics>
    </>
  );
};

export default Scene;
