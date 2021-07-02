import React, { useRef } from "react";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./components/Lighting";
import { Physics } from "@react-three/cannon";
import { Water } from "./components/Water";
import { PHYSICS_PROPS } from "./utils/PHYSICS_PROPS";
import { Walls } from "./components/Walls";
import { DeviceOrientationOrbitControls } from "./components/DeviceOrientationOrbitControls";
import { getIsTouchDevice } from "./getIsTouchDevice";

export function CanvasAndSceneEmpty({
  children = null,
  isLoadingIndicator = false,
  isStartPage = false,
}) {
  const isTouchDevice = getIsTouchDevice();
  // console.log("🌟🚨 ~ isTouchDevice", isTouchDevice);
  const windowSize = useWindowSize();
  const SpinIfLoadingIndicator = isLoadingIndicator
    ? SpinScene
    : React.Fragment;
  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
      }}
      gl={{ antialias: false, alpha: false }}
      {...(isLoadingIndicator
        ? { camera: { fov: 75, position: [0, 0, 15] } }
        : {})}
      style={{ height: windowSize.height, width: windowSize.width }}
    >
      <Lighting />
      <SpinIfLoadingIndicator>
        {isStartPage || isTouchDevice ? (
          <DeviceOrientationOrbitControls />
        ) : (
          <OrbitControls {...({} as any)} />
        )}
        <Physics {...PHYSICS_PROPS}>
          <mesh scale={isLoadingIndicator ? [0.75, 0.75, 0.75] : [1, 1, 1]}>
            <Water />
            {children}
            <Walls />
          </mesh>
        </Physics>
      </SpinIfLoadingIndicator>
    </Canvas>
  );
}

// const SPEED_X = 0.2;
const SPEED_Y = 0.1;
const AMPLITUDE_Y = 0.2;
// const AMPLITUDE_X = 0.7;
function SpinScene({ children }) {
  const ref = useRef(null as any);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
      ref.current.rotation.y = ref.current.rotation.y + 0.0015;
    }
  });
  return <mesh ref={ref}>{children}</mesh>;
}
