import React from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls as Cube } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import { Water } from "./Water";
import { ScaleIndicator } from "./ScaleIndicator";
import { SelectedParticleDisplay } from "./SelectedParticleDisplay";
import { getShouldRenderParticle } from "./Shapes/SingleParticle";
import { useStore } from "../store";

const Scene = () => {
  // audio track
  // useAudioTrack();

  // useSetTemperatureLowInitially();
  const numVisibleParticles = useNumVisibleParticles();
  console.log("🌟🚨 ~ Scene ~ numVisibleParticles", numVisibleParticles);
  return (
    <React.Fragment key={numVisibleParticles}>
      <OrbitControls />
      <Lighting />
      <Physics {...PHYSICS_PROPS}>
        {PROTEINS.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })}
        <Water />
        <Cube />
        <SelectedParticleDisplay />
        <ScaleIndicator />
        {/* <Cells /> */}
      </Physics>
      {/* <Effects /> */}
    </React.Fragment>
  );
};

// PROTEINS.forEach(({ pathToGLTF }) => // useGLTF.preload(pathToGLTF));

export default Scene;

function useNumVisibleParticles() {
  const scale = useStore((s) => s.scale);
  const worldRadius = useStore((s) => s.worldRadius);

  const shouldRenderParticles = PROTEINS.map((protein) =>
    getShouldRenderParticle(scale, protein.radius, worldRadius)
  );

  return shouldRenderParticles.reduce((acc, cur) => acc + Number(cur), 0);
}
