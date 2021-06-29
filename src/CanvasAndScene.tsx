import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import * as Sentry from "@sentry/react";

import { ScaleControls } from "./ScaleControls";
import BottomControls from "./BottomControls";
import { useMediaQuery } from "@material-ui/core";
import { BREAKPOINT_TABLET } from "./utils/constants";
import { Canvas } from "@react-three/fiber";

export default function CanvasAndScene({ renderProteins = true }) {
  const windowSize = useWindowSize();
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINT_TABLET}px)`);
  //  // This one makes the camera move in and out
  //  useFrame(({ clock, camera }) => {
  //   camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
  // })
  return (
    <Sentry.ErrorBoundary
      fallback={() => {
        console.log(`🌟🚨 An error has occurred: CanvasAndScene`);
        return null;
      }}
    >
      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        gl={{ antialias: false, alpha: false }}
        style={{ height: windowSize.height, width: windowSize.width }}
        camera={{ fov: 75, position: [0, 0, 15] }}
      >
        <Scene />
      </Canvas>
      {/* {process.env.NODE_ENV === "development" && isTabletOrLarger ? (
          <Controls anchor={"top_right"} style={{ marginTop: -64 }} />
        ) : null}
      </Controls.Provider> */}
      {/* <ScaleControls />
      <BottomControls /> */}
    </Sentry.ErrorBoundary>
  );
}
