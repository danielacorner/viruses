import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import CellMembrane from "./CellMembrane";
import { useAudioTrack } from "./useAudioTrack";
import { ATPInstanced } from "./GLTFs/other/ATPInstanced";
import { useStoredControl } from "./useStoredControl";
import { Water } from "./Water";
import Cells from "./Cells";
import { useControl } from "react-three-gui";
import { useFrame } from "react-three-fiber";

const Scene = () => {
  const scale = useStoredControl("scale", {
    group: "Environment",
    type: "number",
    min: 0,
    max: 0.002,
    value: 0.001,
  });

  // audio track
  useAudioTrack();
  return (
    <>
      <OrbitControls />
      <Lighting />
      <Physics
        // iterations={20}
        // tolerance={0.0001}
        // allowSleep={false}
        {...PHYSICS_PROPS}
        step={1 / 60 / 1}
      >
        {/* {paused && <DisableRender />} */}

        {PROTEINS.map(
          // TODO: abstract / clean up
          (protein) => {
            return <ProteinGroup key={protein.name} {...protein} />;
          }
        )}
        <Water />
        {/* TODO: ATP is inside the cell only? */}
        {/* <ATPInstanced /> */}
        <Walls />
        {/* <CellMembrane /> */}
        {/* <Cells /> */}
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

PROTEINS.forEach(({ pathToGLTF }) => useGLTF.preload(pathToGLTF));

// instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
// <instancedMesh args={[geometry, material, count]}>

export default Scene;

function DisableRender() {
  useFrame(() => null, 1000);
  return null;
}
