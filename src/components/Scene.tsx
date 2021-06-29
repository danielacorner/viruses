import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import { Water } from "./Water";

const Scene = () => {
  // useSetTemperatureLowInitially();

  const proteins = [
    ...PROTEINS.viruses,
    ...PROTEINS.antibodies,
    ...PROTEINS.nanotech,
  ];
  return (
    <>
      <OrbitControls />
      <Lighting />
      <Physics {...PHYSICS_PROPS}>
        {/* {proteins.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })} */}
        {/* <Water />
        <Walls /> */}
        {/* <SkyBox /> */}
        {/* <SelectedParticleDisplay /> */}
        {/* <Cells /> */}
      </Physics>
      {/* <CustomEffects /> */}
    </>
  );
};

export default Scene;
