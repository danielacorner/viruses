import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import TopControls from "./components/Controls/TopControls";

import SideControls from "./components/Controls/SideControls";
import { BREAKPOINT_TABLET, INITIAL_CAMERA_POSITION } from "./utils/constants";

export default function CanvasAndScene({ renderProteins = true }) {
  const windowSize = useWindowSize();
  //  // This one makes the camera move in and out
  //  useFrame(({ clock, camera }) => {
  //   camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
  // })
  const isTabletOrLarger = windowSize.width >= BREAKPOINT_TABLET;
  return (
    <>
      <Controls.Provider>
        <Controls.Canvas
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
          }}
          gl={{ antialias: false, alpha: false }}
          style={{ height: windowSize.height, width: windowSize.width }}
          camera={{ fov: 75, position: INITIAL_CAMERA_POSITION }}
        >
          <Scene />
        </Controls.Canvas>
        {process.env.NODE_ENV === "development" && isTabletOrLarger ? (
          <Controls />
        ) : null}
      </Controls.Provider>
      {/* <HideHpControls /> */}
      <SideControls />
      <TopControls />
    </>
  );
}

// function HideHpControls() {
//   const set = useStore((s) => s.set);
//   const showHp = useStore((s) => s.showHp);
//   return (
//     <div style={{ position: "fixed", top: 6, right: 16 }}>
//       <IconButton onClick={() => set({ showHp: !showHp })}>
//         {showHp ? <Visibility /> : <VisibilityOff />}
//       </IconButton>
//     </div>
//   );
// }
