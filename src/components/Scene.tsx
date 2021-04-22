import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import { Water } from "./Water";
import { SelectedParticleDisplay } from "./SelectedParticleDisplay";
import { useAudioTrack } from "./useAudioTrack";
import * as Sentry from "@sentry/react";

const Scene = () => {
  // audio track
  useAudioTrack();

  // useSetTemperatureLowInitially();

  return (
    <>
      <OrbitControls />
      <Lighting />
      <Physics {...PHYSICS_PROPS}>
        {[
          ...PROTEINS.viruses,
          ...PROTEINS.antibodies,
          ...PROTEINS.nanotech,
        ].map((protein) => {
          return (
            <Sentry.ErrorBoundary
              fallback={`An error has occurred: ${protein.type} particle - ${protein.name}`}
            >
              <ProteinGroup key={protein.name} {...protein} />;
            </Sentry.ErrorBoundary>
          );
        })}
        <Water />
        <Walls />
        {/* <SkyBox /> */}
        <SelectedParticleDisplay />
        {/* <Cells /> */}
      </Physics>
      {/* <CustomEffects /> */}
    </>
  );
};

export default Scene;
