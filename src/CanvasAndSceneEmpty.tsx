import React, { useRef } from "react";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./components/Lighting";
import { Physics } from "@react-three/cannon";
import { Water } from "./components/Water";
import { PHYSICS_PROPS } from "./utils/PHYSICS_PROPS";
import { Walls } from "./components/Walls";
import { ScaleIndicator } from "./components/ScaleIndicator";

export function CanvasAndSceneEmpty({
  children = null,
  isLoadingIndicator = false,
}) {
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
        <OrbitControls />
        <Physics {...PHYSICS_PROPS}>
          <Water />
          {children}
          <Walls />
          <ScaleIndicator />
        </Physics>
      </SpinIfLoadingIndicator>
    </Canvas>
  );
}

function SpinScene({ children }) {
  const ref = useRef(null as any);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = -Math.sin(time / 4);
      ref.current.rotation.y = -Math.sin(time / 2);
    }
  });
  return <mesh ref={ref}>{children}</mesh>;
}
