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
import { useMount } from "../utils/utils";
import { useStore } from "../store";

const Scene = () => {
  // audio track
  // useAudioTrack();

  // useSetTemperatureLowInitially();
  return (
    <>
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
    </>
  );
};

// function useSetTemperatureLowInitially() {
//   const set = useStore((s) => s.set);
//   // set temperature low to start...
//   useMount(() => {
//     setTimeout(() => {
//     //   console.log("🌟🚨 ~ setTimeout ~ setTimeout");
//     set({ temperature: 0.002 });
//     }, 2000);
//   });
// }

// PROTEINS.forEach(({ pathToGLTF }) => // useGLTF.preload(pathToGLTF));

export default Scene;
