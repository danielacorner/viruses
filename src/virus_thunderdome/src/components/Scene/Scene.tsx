import React, { Suspense, useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import { PHYSICS_PROPS } from "../../utils/PHYSICS_PROPS";
import { Water } from "./Water";
import { ScaleIndicator } from "../Sliders/ScaleIndicator";
import { SelectedParticleDisplay } from "../SelectedParticle/SelectedParticleDisplay";
import CellsModels from "../CellAndAntibodyButtons/CellsModels";
import Game from "../Game/Game";
import { useAudioTrack } from "../music/useAudioTrack";
import { useSpring, a } from "react-spring/three";
import { useCameraY } from "./useCameraY";

const Scene = () => {
  // useCameraWobble();
  return (
    <Suspense fallback={null}>
      <AudioTrack />
      <OrbitControls />
      <PhysicsSceneMovable />
      <Lighting />
    </Suspense>
  );
};

function PhysicsSceneMovable() {
  const newY = useCameraY();

  const springDownOnWaveChange = useSpring({ position: [0, newY, 0] });

  return (
    <a.group position={springDownOnWaveChange.position}>
      <Physics {...PHYSICS_PROPS}>
        <Walls />
        <Water />
        <ScaleIndicator />
        <Game />
        <SelectedParticleDisplay />
        <CellsModels />
      </Physics>
    </a.group>
  );
}

function AudioTrack() {
  // audio track
  useAudioTrack();
  return null;
}

// PROTEINS.forEach(({ pathToGLTF }) => // useGLTF.preload(pathToGLTF));

export default Scene;
