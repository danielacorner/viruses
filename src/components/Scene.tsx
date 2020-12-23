import React, { useEffect, useMemo, useRef, useState } from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { Walls } from "./Walls";
import JitteryParticle from "./Shapes/JitteryParticle";
import ModelActivatorProtein from "./GLTFs/activator_protein-1";
import SarsCov2 from "./GLTFs/SarsCov2";
import Model1bv1 from "./GLTFs/1bv1";
import ModelAntibody from "./GLTFs/antibody";
import * as THREE from "three";

const object3D = new THREE.Object3D();
const tempColor = new THREE.Color();

const Scene = () => {
  const numParticles: number = useControl("particles", {
    type: "number",
    min: 1,
    max: 1000,
    value: 10,
  });
  const temperature: number = useControl("temperature", {
    type: "number",
    min: 0,
    max: 1,
    value: 0.01,
  });

  const proteins = [
    {
      particle: SarsCov2,
      scale: 0.005,
    },
    {
      particle: Model1bv1,
      scale: 0.005,
    },
    {
      particle: ModelActivatorProtein,
      scale: 0.005,
    },
    {
      particle: ModelAntibody,
      scale: 0.005,
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
        {proteins.map(({ particle, scale }, idx) => (
          <React.Fragment key={idx}>
            {/* // instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01 */}
            {/* <instancedMesh args={[geometry, material, count]}> */}
            <JitteryParticle
              // key={JSON.stringify(pos)}
              {...{
                numParticles: Math.ceil(numParticles),
                ChildParticle: particle,
                // positionsArray: positionsArrays[idx],
                temperature,
                scale,
              }}
            />
            {/* </instancedMesh> */}
          </React.Fragment>
        ))}
        <Walls />
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

export default Scene;
