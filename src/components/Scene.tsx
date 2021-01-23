import React, { useEffect } from "react";
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
import { usePrevious } from "../utils/hooks";
import { randBetween } from "../utils/utils";

const Scene = () => {
  // audio track
  // useAudioTrack();

  // useSetTemperatureLowInitially();
  // when num particles changes, reboot physics
  // const rebootKey = useRebootPhysicsWhenNewParticlesLoad();
  return (
    <React.Fragment /* key={rebootKey} */>
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

function useRebootPhysicsWhenNewParticlesLoad() {
  const numVisibleParticles = useNumVisibleParticles();
  // useBudgeTemperatureToRebootVelocities();

  return numVisibleParticles;
}

function useBudgeTemperatureToRebootVelocities() {
  const set = useStore((s) => s.set);
  const temperature = useStore((s) => s.temperature);
  // when particles change, restart the temperature
  const nextTemp = temperature + randBetween(1, -1) / 1000;
  const prev = usePrevious(nextTemp);
  useEffect(() => {
    // if temperature was changed via the controls
    if (temperature !== prev) {
      set({ temperature: nextTemp });
    }
  }, [temperature, prev, nextTemp, set]);
}
