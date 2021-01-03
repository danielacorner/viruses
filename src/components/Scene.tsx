import React, { useEffect } from "react";
import { Physics, useSphere } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { ControlOptions, useControl } from "react-three-gui";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import CellMembrane from "./CellMembrane";
import { useAudioTrack } from "./useAudioTrack";
import * as THREE from "three";
import { ATPInstanced } from "./GLTFs/other/ATPInstanced";
import { useStore } from "../store";

const Scene = () => {
  const temperature = useStoredControl("temperature", {
    group: "Environment",
    type: "number",
    min: 0,
    max: 100,
    value: 1,
  });

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
      >
        {PROTEINS.map(
          ({ particle, pathToGLTF, name, interactive, mass, scale }) => {
            return (
              <ProteinGroup
                key={pathToGLTF}
                {...{
                  particleName: name,
                  particle,
                  interactive,
                  // instanced,
                  pathToGLTF,
                  mass,
                }}
              />
            );
          }
        )}
        <Water />
        {/* TODO: ATP is inside the cell only? */}
        {/* <ATPInstanced /> */}
        <Walls />
        {/* <CellMembrane /> */}
      </Physics>
      {/* <Effects /> */}
    </>
  );
};

PROTEINS.forEach(({ pathToGLTF }) => useGLTF.preload(pathToGLTF));

// instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
// <instancedMesh args={[geometry, material, count]}>

export default Scene;

const numWaterMolecules = 5;

/** name must be identical to stored value */
function useStoredControl(name: string, controlProps: ControlOptions) {
  // const storedValue = useStore((state) => state[name]);
  const controlledValue: number = useControl(name, controlProps);
  // sync temperature to store
  const set = useStore((state) => state.set);
  useEffect(() => {
    set({ [name]: controlledValue });
  }, [set, name, controlledValue]);

  return controlledValue;
}

function Water() {
  const [ref] = useSphere((index) => ({
    mass: 0.2,
    position: [Math.random() - 0.5, Math.random() - 0.5, index * 2],
    args: 1,
  }));
  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      args={[null, null, numWaterMolecules]}
      renderOrder={2}
    >
      <sphereBufferGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color={new THREE.Color("#6f6dda")}
        transparent={true}
        opacity={0.5}
      />
    </instancedMesh>
  );
}
