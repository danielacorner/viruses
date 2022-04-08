import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import * as Sentry from "@sentry/react";

import { ScaleControls } from "./components/controls/ScaleControls";
import BottomControls from "./components/controls/BottomControls";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function CanvasAndScene({ renderProteins = true }) {
  const windowSize = useWindowSize();
  return (
    <Sentry.ErrorBoundary
      fallback={() => {
        console.log(`🚨 An error has occurred: CanvasAndScene`);
        return null;
      }}
    >
      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        gl={{ antialias: false, alpha: false }}
        style={{
          height: windowSize.height,
          width: windowSize.width,
          touchAction: "none",
        }}
        camera={{ fov: 75, position: [0, 0, 15] }}
      >
        <OrbitControls {...({} as any)} />
        {/* {getIsTouchDevice() ? (
          <DeviceOrientationOrbitControls />
        ) : (
          <OrbitControls {...({} as any)} />
        )} */}
        <Scene />
      </Canvas>
      {/* {process.env.NODE_ENV === "development" && isTabletOrLarger ? (
          <Controls anchor={"top_right"} style={{ marginTop: -64 }} />
        ) : null}
      </Controls.Provider> */}
      <ScaleControls />
      <BottomControls />
    </Sentry.ErrorBoundary>
  );
}
