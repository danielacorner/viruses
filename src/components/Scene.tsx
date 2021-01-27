import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import { Water } from "./Water";
import { ScaleIndicator } from "./ScaleIndicator";
import { SelectedParticleDisplay } from "./SelectedParticleDisplay";
import { SkyBox } from "./SkyBox/SkyBox";

const Scene = () => {
  // audio track
  // useAudioTrack();

  // useSetTemperatureLowInitially();

  return (
    <React.Fragment /* key={rebootKey} */>
      <OrbitControls />
      <Lighting />
      <Physics {...PHYSICS_PROPS}>
        {PROTEINS.viruses.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })}
        {PROTEINS.antibodies.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })}
        {PROTEINS.nanotech.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })}
        <Water />
        <Walls />
        {/* <SkyBox /> */}
        <SelectedParticleDisplay />
        <ScaleIndicator />
        {/* <Cells /> */}
      </Physics>
      {/* <Effects /> */}
    </React.Fragment>
  );
};

export default Scene;
