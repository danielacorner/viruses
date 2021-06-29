import { Suspense } from "react";
import { Physics, Debug } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import { PHYSICS_PROPS } from "../../utils/PHYSICS_PROPS";
import { Water } from "./Water";
import { ScaleIndicator } from "../Sliders/ScaleIndicator";
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
        <Debugger>
          <Walls />
          <Water />
          <ScaleIndicator />
          <Game />
          {/* <SelectedParticleDisplay /> */}
          <CellsModels />
        </Debugger>
      </Physics>
    </a.group>
  );
}

function Debugger({ children }) {
  return process.env.NODE_ENV === "development" ? (
    <Debug color="black">{children}</Debug>
  ) : (
    <>{children}</>
  );
}

function AudioTrack() {
  // audio track
  useAudioTrack();
  return null;
}

// PROTEINS.forEach(({ pathToGLTF }) => // useGLTF.preload(pathToGLTF));

export default Scene;
